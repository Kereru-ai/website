# Kereru.ai - Sovereign AI for Aotearoa

## Project Overview
Kereru.ai is New Zealand's sovereign AI infrastructure provider, offering secure, locally-controlled AI solutions. This React + Vite SPA showcases their services and includes an integrated AI chatbot powered by two models: a free-tier Llama model (via OpenRouter) and a custom Kereru AI model (via Together AI) with web search capabilities.

## Architecture
- **Frontend**: React 19 + Vite, TypeScript, single-page application with conditional routing
- **Backend**: Cloudflare Functions proxying to external AI APIs (OpenRouter, Together AI, Tavily)
- **Styling**: Custom CSS with "kereru-" prefixed classes, Lucide React icons
- **Deployment**: Cloudflare Pages with SPA routing

## Key Components & Services

### AI Services (`services/`)
- **`geminiService.ts`**: Free-tier chat using Llama 3.2 via OpenRouter API
- **`kereruService.ts`**: Premium chat with NZ web search using custom Kereru model on Together AI
- **`guardrails.ts`**: Comprehensive security filtering (secrets, harmful content, rate limiting)

### API Endpoints (`functions/api/`)
- **`/api/chat`**: Proxies to OpenRouter (free Llama model)
- **`/api/kereru`**: Proxies to Together AI (Kereru model)
- **`/api/search`**: NZ-focused web search via Tavily API

### Components (`components/`)
- **`KereruChat.tsx`**: Main chat interface with markdown formatting
- **`InfrastructureDiagram.tsx`**: Visual infrastructure representation
- **`HomePage.tsx`, `ChatPage.tsx`**: Marketing pages

## Development Workflow

### Environment Setup
```bash
npm install
# Copy .env with API keys:
# GEMINI_API_KEY=your_openrouter_key
# TOGETHER_API_KEY=your_together_key
# TAVILY_API_KEY=your_tavily_key
# SCX_API_KEY=optional_partner_key
```

### Commands
- `npm run dev`: Start Vite dev server (port 3000, host 0.0.0.0)
- `npm run build`: Build for production (outputs to `dist/`)
- `npm run preview`: Preview production build

### Build Configuration
- **Vite config**: Path alias `@/*` → `./`, environment variables injected as `process.env.*`
- **TypeScript**: Strict mode, ES2022 target, JSX transform
- **Cloudflare Pages**: SPA routing configured for single-page app

## Code Patterns & Conventions

### API Integration
All external API calls route through Cloudflare Functions to:
- Avoid CORS issues
- Secure API keys from frontend exposure
- Enable server-side processing

Example pattern:
```typescript
// Frontend service calls internal API
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message, history })
});

// Cloudflare Function proxies to external API
const externalResponse = await fetch('https://api.openrouter.ai/...', {
  headers: { 'Authorization': `Bearer ${env.GEMINI_API_KEY}` }
});
```

### State Management
- React hooks for local component state
- No global state management library
- Chat history maintained in component state

### Styling Patterns
- Custom CSS classes: `kereru-panel`, `kereru-neon`, `kereru-dark`
- Glass morphism effects: `glass-panel`
- Gradient backgrounds: `mesh-gradient`
- Button styles: `btn-8020`, `btn-8020-white`

### Type Safety
- Strict TypeScript with interfaces in `types.ts`
- Chat message types: `ChatMessage`, `ChatHistoryItem`
- API response types inferred from usage

## Security & Guardrails

### Input/Output Filtering
- **Secrets detection**: Blocks API keys, private keys, tokens
- **Content filtering**: Prevents harmful requests (weapons, malware, self-harm)
- **Toxicity checking**: Filters inappropriate content
- **Rate limiting**: 30 requests/minute per user

### Implementation
Guardrails applied in `kereruService.ts`:
```typescript
// Check input before API call
const promptCheck = await checkPromptGuardrails(message);
if (!promptCheck.allowed) {
  return getSafeRefusalMessage(promptCheck.reason);
}

// Check output after API response
const outputCheck = await checkOutputGuardrails(response);
if (!outputCheck.allowed) {
  return sanitizeOutput(response);
}
```

## NZ-Specific Features

### Cultural Adaptation
- Maori greetings ("Kia ora")
- NZ-focused search domains: `.govt.nz`, `.co.nz`, `.org.nz`, `.ac.nz`
- Sovereign AI messaging emphasizing local control and data residency

### Business Model
- NZD pricing (no FX risk)
- Data sovereignty compliance (NZ Privacy Act)
- Environmentally efficient infrastructure (10x less power/water than standard clusters)

## Common Tasks

### Adding New Chat Features
1. Extend guardrails in `services/guardrails.ts`
2. Add API endpoint in `functions/api/`
3. Create/update service in `services/`
4. Integrate in `KereruChat.tsx`

### Styling Updates
- Use existing "kereru-" class patterns
- Maintain glass morphism and gradient effects
- Test on mobile (responsive design)

### API Key Management
- All keys stored as environment variables
- Accessed via `env.*` in Cloudflare Functions
- Injected as `process.env.*` in Vite config

## Testing
- Guardrails tested in `services/guardrails.test.ts`
- Manual testing via chat interface
- API endpoints testable via direct calls

## Deployment
- Automatic Cloudflare Pages deployment on git push
- Environment variables configured in Cloudflare Pages dashboard
- Cloudflare Functions deployed automatically</content>
<parameter name="filePath">c:\Users\ashdu\projects\SovereignAI\website-main\.github\copilot-instructions.md