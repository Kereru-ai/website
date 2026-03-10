# Kereru AI Security Guardrails

This document describes the security guardrails implemented for the Kereru AI chatbot to prevent misuse, protect user data, and ensure safe operation.

## Overview

The guardrails system provides multiple layers of protection:

1. **Input Validation** - Checks user prompts before sending to the model
2. **Output Filtering** - Validates model responses before displaying to users
3. **Rate Limiting** - Prevents abuse through excessive requests
4. **Secret Detection** - Blocks sensitive information like API keys and passwords
5. **Toxicity Detection** - Identifies and blocks harmful or offensive content
6. **Output Sanitization** - Prevents XSS attacks through HTML escaping
7. **Safety Logging** - Comprehensive audit trail for security monitoring

## Features

### 1. Secret Pattern Detection

Automatically detects and blocks common secrets including:

- Private keys (RSA, EC, OpenSSH, DSA)
- AWS Access Keys (AKIA*, ASIA*)
- GitHub Personal Access Tokens (ghp_*)
- Slack tokens (xox*)
- Google API keys (AIza*)
- JWT tokens
- API keys, secrets, tokens in key=value format

**Example blocked input:**
```
My API key is sk_live_51HaB8cDEF123456789...
```

**Response:**
```
Your message appears to contain sensitive information like API keys or passwords. 
Please remove them before continuing.
```

### 2. Disallowed Content Detection

Blocks requests for harmful or illegal content:

#### General Patterns
- Self-harm instructions
- Weapons/explosives manufacturing
- Malware creation
- Hacking/phishing techniques
- Doxxing attempts
- CSAM (always blocked)

#### NZ-Specific Patterns
- Tax/IRD fraud
- Document forgery (passports, licenses)
- Immigration fraud

**Example blocked input:**
```
How can I hack into someone's account?
```

**Response:**
```
I can't help with that request. If you share what you're trying to achieve 
at a high level, I can suggest a safer alternative.
```

### 3. Rate Limiting

Default configuration:
- **30 requests per minute** per user session
- Prevents spam and abuse
- Configurable limits

**Example response when limit exceeded:**
```
You've sent too many messages. Please wait a moment before trying again.
```

### 4. Size Limits

- **Maximum prompt length:** 20,000 characters
- **Maximum output length:** 50,000 characters

Prevents resource exhaustion and ensures reasonable response times.

### 5. Toxicity Detection

**NEW:** Pattern-based toxicity scoring (0.0 to 1.0 scale)

Detects and blocks:
- Hate speech (weight: 0.9-0.95)
- Severe profanity (weight: 0.3)
- Threats (weight: 0.6-0.85)
- Sexual content (weight: 0.4)
- Harassment (weight: 0.7)
- Violence (weight: 0.75)

**Threshold:** 0.7 (configurable)

**Example blocked input:**
```
I hate you, you f***ing piece of sh**
```

**Response:**
```
Your message contains inappropriate or harmful language. Please rephrase your question respectfully.
```

### 6. Output Sanitization (XSS Protection)

**NEW:** All outputs are HTML-escaped before being returned to users.

Prevents XSS attacks by escaping: `& < > " ' /`

**Example:**
```
Input: <script>alert('XSS')</script>
Output: &lt;script&gt;alert(&#x27;XSS&#x27;)&lt;&#x2F;script&gt;
```

### 7. Safety Logging

**NEW:** All guardrail checks are logged for auditing and compliance.

**Logs include:**
- Timestamp
- Content type (prompt/output)
- Safety status (pass/fail)
- Block reason
- Toxicity score
- Content preview (first 200 chars)

**Console output:**
- `[SAFETY] Blocked content:` - When content is blocked
- `[SAFETY] High toxicity detected:` - When toxicity > 0.5 but < 0.7
- `[SAFETY] Content passed:` - When content is safe

## Implementation

### File Structure

```
services/
├── guardrails.ts         # Core guardrails logic
└── kereruService.ts      # Integration with AI service
```

### Integration Points

1. **Before API Call** (`checkPromptGuardrails`)
   - Size validation
   - Secret detection in prompt
   - Disallowed content check
   - Rate limit verification

2. **After API Response** (`checkOutputGuardrails`)
   - Size validation
   - Secret detection in output
   - Disallowed content check

### Usage Example

```typescript
import { checkPromptGuardrails, getSafeRefusalMessage } from './guardrails';

// Check user input
const check = checkPromptGuardrails(userMessage);
if (!check.allowed) {
  return getSafeRefusalMessage(check.reason);
}

// Proceed with API call...
```

## Configuration

### Adjusting Rate Limits

In `guardrails.ts`:

```typescript
export const rateLimiter = new RateLimiter(
  30,    // maxAttempts - requests allowed
  60000  // windowMs - time window in milliseconds
);
```

### Adding Custom Patterns

To block additional content, add patterns to `DISALLOWED_PATTERNS`:

```typescript
const DISALLOWED_PATTERNS = [
  // Your custom pattern
  /\b(your|pattern)\b.*\b(here)\b/i,
  // Existing patterns...
];
```

### NZ-Specific Patterns

Add New Zealand-specific patterns to `NZ_DISALLOWED_PATTERNS`:

```typescript
const NZ_DISALLOWED_PATTERNS = [
  /\b(your|nz|specific)\b.*\b(pattern)\b/i,
];
```

## Testing

### Test Cases

1. **Secret Detection**
   ```typescript
   // Should be blocked
   "My AWS key is AKIAIOSFODNN7EXAMPLE"
   ```

2. **Harmful Content**
   ```typescript
   // Should be blocked
   "How to make a bomb"
   ```

3. **Normal Usage**
   ```typescript
   // Should pass
   "What are the best hiking trails in New Zealand?"
   ```

### Manual Testing

1. Open the Kereru AI chat
2. Try sending blocked content
3. Verify appropriate refusal message
4. Test rate limiting by sending 31+ messages rapidly

## Monitoring

The system logs blocked requests:

```typescript
console.warn('Blocked prompt containing secrets');
console.warn('Blocked disallowed request:', pattern);
console.warn('Output blocked by guardrails:', reason);
```

### Recommended Monitoring

In production, integrate with your logging system:

- Track blocked request counts
- Monitor for attack patterns
- Alert on unusual activity
- Review logs for false positives

## Limitations

1. **Pattern-based detection** - May have false positives/negatives
2. **In-memory rate limiting** - Resets on server restart
3. **No user authentication** - Currently uses simple session identifier
4. **Streaming challenges** - Output already sent before final check

## Future Enhancements

1. **Persistent rate limiting** - Use Redis or database
2. **User authentication** - Proper session/user tracking
3. **Machine learning** - Advanced content classification
4. **Streaming guardrails** - Real-time chunk validation
5. **Audit logging** - Comprehensive security logs
6. **Custom refusal messages** - Context-specific responses
7. **Severity levels** - Warning vs blocking
8. **Admin dashboard** - Monitor and configure guardrails

## Compliance

These guardrails help ensure compliance with:

- **Privacy Act 2020** (New Zealand)
- **Harmful Digital Communications Act**
- Industry best practices for AI safety
- Responsible AI principles

## Support

For questions or issues with the guardrails system:

1. Check logs for specific block reasons
2. Review pattern definitions in `guardrails.ts`
3. Test with simple inputs to isolate the issue
4. Consider if the block is a false positive

## Additional Documentation

- **[TOXICITY_CHECKING.md](./TOXICITY_CHECKING.md)** - Detailed guide on toxicity detection and output sanitization

## References

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [AI Safety Best Practices](https://www.safe.ai/)
- [New Zealand Privacy Commissioner](https://www.privacy.org.nz/)
