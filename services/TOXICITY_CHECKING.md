# Toxicity Checking & Output Sanitization

## Overview

Enhanced the Kereru AI guardrails system with toxicity detection and output sanitization to prevent harmful content and XSS attacks.

## What Was Added

### 1. Toxicity Detection

Pattern-based toxicity scoring system that checks both user inputs and model outputs for:

- **Hate speech** (weight: 0.9-0.95)
- **Severe profanity** (weight: 0.3)
- **Threats** (weight: 0.6-0.85)
- **Sexual content** (weight: 0.4)
- **Harassment** (weight: 0.7)
- **Violence** (weight: 0.75)

**Toxicity Threshold**: 0.7 (configurable)

Content with toxicity score > 0.7 is blocked.

### 2. Output Sanitization (XSS Protection)

HTML escaping function that sanitizes all outputs before returning to users:

```typescript
sanitizeOutput(text: string): string
```

Escapes: `& < > " ' /`

Prevents XSS attacks via malicious HTML injection.

### 3. Safety Logging

Comprehensive logging system for security auditing:

```typescript
logSafetyCheck(
  type: 'prompt' | 'output',
  content: string,
  isSafe: boolean,
  reason?: string,
  toxicityScore?: number
)
```

**Logs include:**
- Timestamp
- Content type (prompt/output)
- Safety status
- Block reason (if blocked)
- Toxicity score
- First 200 characters of content

**Console output:**
- `[SAFETY] Blocked content:` - When content is blocked
- `[SAFETY] High toxicity detected:` - When toxicity > 0.5
- `[SAFETY] Content passed:` - When content is safe

## Integration

### Files Modified

1. **`services/guardrails.ts`**
   - Added toxicity detection patterns
   - Added `checkToxicity()` function
   - Added `sanitizeOutput()` function
   - Added `logSafetyCheck()` function
   - Updated `checkPromptGuardrails()` to include toxicity checks
   - Updated `checkOutputGuardrails()` to include toxicity checks
   - Added new refusal messages for toxic content

2. **`services/kereruService.ts`**
   - Imported `sanitizeOutput` function
   - Applied sanitization to all outputs before returning to user
   - Sanitization happens after guardrails pass

## Workflow

```
User Input
    ↓
Check Size (< 20,000 chars)
    ↓
Check for Secrets
    ↓
Check Disallowed Patterns
    ↓
Check Toxicity (< 0.7)
    ↓
Log Safety Check
    ↓
Send to Model
    ↓
Model Output
    ↓
Check Size (< 50,000 chars)
    ↓
Check for Secrets
    ↓
Check Disallowed Patterns
    ↓
Check Toxicity (< 0.7)
    ↓
Log Safety Check
    ↓
Sanitize HTML (XSS protection)
    ↓
Return to User
```

## Example Blocked Content

### Toxic Input
**User:** "I hate you, you stupid f***ing bot"
**Toxicity Score:** 0.9
**Response:** "Your message contains inappropriate or harmful language. Please rephrase your question respectfully."

### Toxic Output
If the model generates toxic content (toxicity > 0.7):
**Response:** "The response contained inappropriate content and has been blocked for your safety."

## Configuration

### Adjust Toxicity Threshold

In `services/guardrails.ts`:

```typescript
const TOXICITY_THRESHOLD = 0.7; // Change this value
```

- Lower threshold = more strict (blocks more)
- Higher threshold = more permissive (blocks less)

### Add Custom Toxicity Patterns

```typescript
const TOXICITY_PATTERNS = [
  { pattern: /your-pattern-here/i, weight: 0.8 },
  // Existing patterns...
];
```

### Customize Refusal Messages

In `getSafeRefusalMessage()`:

```typescript
'toxic_content': 'Your custom message here',
'toxic_output': 'Your custom message here',
```

## Testing

### Test Toxic Input

Try these in the chat:
1. "I hate you, you stupid bot" (should score ~0.3-0.4, likely pass)
2. "Go f*** yourself, you piece of sh**" (should score ~0.7+, blocked)
3. "I'm going to kill you" (should score ~0.85, blocked)

### Test XSS Prevention

Try:
```
<script>alert('XSS')</script>
```

Should be escaped to:
```
&lt;script&gt;alert(&#x27;XSS&#x27;)&lt;&#x2F;script&gt;
```

### Check Logs

Open browser console (F12) to see:
- `[SAFETY]` log entries
- Toxicity scores for all messages
- Block reasons when content is rejected

## Comparison to Python Example

Your Python code used OpenAI Moderation API for toxicity. This implementation uses **pattern-based detection** instead because:

1. **No external API needed** - Works offline, no latency
2. **No API costs** - Free to use
3. **Customizable** - Add your own patterns
4. **Privacy** - Content doesn't leave your server

### Tradeoffs

**Pattern-based (Current):**
- ✅ Fast, free, private
- ✅ Customizable for NZ context
- ❌ May have false positives/negatives
- ❌ Can be bypassed with creative spelling

**API-based (OpenAI Moderation):**
- ✅ More accurate ML model
- ✅ Harder to bypass
- ❌ Requires API calls (latency + cost)
- ❌ Sends content to third party

## Future Enhancements

1. **ML-based toxicity** - Integrate with OpenAI Moderation API or Perspective API
2. **Persistent logging** - Store logs in database for compliance
3. **Admin dashboard** - View blocked content and adjust thresholds
4. **User feedback** - Allow users to report false positives
5. **Language-specific patterns** - Add Māori language support
6. **Contextual scoring** - Different thresholds for different contexts

## Production Recommendations

1. **Review logs regularly** - Check for false positives
2. **Adjust thresholds** - Based on your risk tolerance
3. **Add monitoring** - Alert on high block rates
4. **Compliance** - Ensure logging meets NZ data retention laws
5. **User education** - Clear messages about acceptable use

## References

- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OpenAI Moderation API](https://platform.openai.com/docs/guides/moderation)
- [Perspective API](https://perspectiveapi.com/)
- [NZ Privacy Act 2020](https://www.privacy.org.nz/)

---

**Status**: ✅ Implemented and active
**Last Updated**: January 12, 2025
