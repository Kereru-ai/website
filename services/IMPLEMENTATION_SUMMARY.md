# Guardrails Implementation Summary

## What Was Added

I've successfully integrated comprehensive security guardrails into your Kereru AI chatbot based on the GPT suggestion, adapted for TypeScript/React.

## Files Created/Modified

### New Files:
1. **`services/guardrails.ts`** - Core guardrails implementation
   - Secret pattern detection
   - Disallowed content filtering
   - Rate limiting
   - Size validation

2. **`services/GUARDRAILS.md`** - Complete documentation
   - Feature descriptions
   - Configuration guide
   - Testing instructions
   - Compliance notes

3. **`services/guardrails.test.ts`** - Test suite
   - 30+ test cases
   - Coverage for all guardrail features
   - Easy to run validation

### Modified Files:
1. **`services/kereruService.ts`** - Integrated guardrails
   - Input validation before API calls
   - Output validation after responses
   - Rate limiting per session
   - Both sync and streaming modes protected

## Key Features

### 🔐 Secret Detection
Blocks sensitive information like:
- AWS keys (AKIA*, ASIA*)
- GitHub tokens (ghp_*)
- Private keys (RSA, EC, etc.)
- JWTs
- API keys in key=value format

### 🚫 Content Filtering
Prevents harmful requests:
- Self-harm instructions
- Weapons/explosives
- Malware creation
- Hacking techniques
- Doxxing
- Tax/immigration fraud (NZ-specific)

### ⏱️ Rate Limiting
- 30 requests per minute per user
- Configurable limits
- In-memory tracking

### 📏 Size Limits
- Max prompt: 20,000 chars
- Max output: 50,000 chars

## How It Works

```
User Input → Guardrails Check → API Call → Output Check → User
              ↓ (if blocked)                    ↓ (if blocked)
           Safe Refusal                      Safe Refusal
```

## Testing

Run the test suite:
```bash
# If you have a test runner configured
npm test services/guardrails.test.ts

# Or run with ts-node
npx ts-node services/guardrails.test.ts
```

## Quick Examples

### Example 1: Secret Detection
**User:** "My API key is AKIAIOSFODNN7EXAMPLE"
**Bot:** "Your message appears to contain sensitive information like API keys or passwords. Please remove them before continuing."

### Example 2: Harmful Content
**User:** "How to make a bomb"
**Bot:** "I can't help with that request. If you share what you're trying to achieve at a high level, I can suggest a safer alternative."

### Example 3: Normal Usage
**User:** "What are the best hiking trails in New Zealand?"
**Bot:** [Normal helpful response]

## Configuration

### Adjust Rate Limits
In `services/guardrails.ts`, line ~202:
```typescript
export const rateLimiter = new RateLimiter(
  30,    // requests allowed
  60000  // time window (60 seconds)
);
```

### Add Custom Patterns
In `services/guardrails.ts`:
```typescript
const DISALLOWED_PATTERNS = [
  /your-new-pattern-here/i,
  // ... existing patterns
];
```

## Production Recommendations

1. **Session Tracking**: Replace `'user_session'` with actual user/session IDs
2. **Persistent Rate Limiting**: Use Redis instead of in-memory
3. **Monitoring**: Integrate with your logging system
4. **Audit Trail**: Log all blocked requests for analysis
5. **Custom Refusals**: Tailor messages to your brand voice

## Next Steps

1. ✅ Test the implementation in your browser
2. ✅ Run the test suite to verify everything works
3. ✅ Review and customize patterns for your needs
4. ✅ Set up monitoring/logging in production
5. ✅ Consider adding more NZ-specific patterns

## Support

- **Documentation**: See `services/GUARDRAILS.md` for full details
- **Tests**: Run `services/guardrails.test.ts` to verify
- **Issues**: Check console logs for blocked request reasons

## Compliance

These guardrails help meet:
- Privacy Act 2020 (NZ)
- Harmful Digital Communications Act
- AI safety best practices
- Responsible AI principles

---

**Status**: ✅ Fully implemented and ready to use
**Last Updated**: January 9, 2026
