// OpenRouter API Service for Kereru.ai - Free Tier
// This runs server-side and avoids CORS issues
// Updated: 2025-12-21

interface Env {
  GEMINI_API_KEY: string; // Actually holds OpenRouter API key now
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  
  try {
    const body = await request.json() as {
      message: string;
      history: { role: string; parts: { text: string }[] }[];
    };

    const apiKey = env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error('API key missing from environment');
      return new Response(JSON.stringify({ 
        error: 'API key not configured',
        message: 'GEMINI_API_KEY environment variable is not set'
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    console.log('API key found, length:', apiKey.length, 'starts with:', apiKey.substring(0, 8));

    // System instruction for Kereru.ai context
    const systemInstruction = `You are the AI assistant for Kereru.ai, New Zealand's sovereign AI infrastructure & model provider.
    
Key Strategic Information:
- CAPABILITY: Kereru.ai is a New Zealand Provider of Sovereign AI, we provide two compute planes with one user experience, reducing our environmental footprint while retaining the highest level of GPU on offer
- OWNERSHIP: We are majority New Zealand owned with strategic backing.
- MODEL: We are customized for New Zealand's unique regulatory and cultural landscape.
- MISSION: Delivering secure, responsible, and locally-controlled AI solutions for Aotearoa.

Key Benefits / USPs:
1. Economic: Buy with NZD (no FX risk).
2. Sovereignty: Granular controls that protect/control data sovereignty.
3. Sustainability: 10X less power / water consumption (PUE / WUE) than standard clusters.

Value Proposition:
- Data Sovereignty: Data stays in NZ.
- Infrastructure: Local compute power.
- Ethics: Culturally appropriate AI (Data sovereignty awareness).

Tone: Professional, high-tech, reassuring, and distinctly Kiwi (friendly but highly competent).

Always emphasize the strength of the technology offering when asked about technology or capability.`;

    // Clean the history: Remove errors
    const cleanHistory = body.history.filter(h => 
      h.parts[0]?.text && 
      !h.parts[0].text.includes("Network interruption") &&
      !h.parts[0].text.includes("I'm sorry") &&
      !h.parts[0].text.includes("couldn't")
    );

    // Map to OpenAI-compatible format (used by OpenRouter)
    const messages = [
      { role: 'system', content: systemInstruction },
      ...cleanHistory.map(h => ({
        role: h.role === 'user' ? 'user' : 'assistant',
        content: h.parts[0].text
      })),
      {
        role: 'user',
        content: body.message
      }
    ];

    // Call OpenRouter API
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://kereru.ai',
          'X-Title': 'Kereru.ai Chat'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-3b-instruct:free',
          messages: messages,
          temperature: 0.7,
          max_tokens: 500
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API Error:', response.status, errorText);
      return new Response(JSON.stringify({ 
        error: `API request failed: ${response.status}`,
        details: errorText
      }), {
        status: response.status,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error: any) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};

// Handle OPTIONS request for CORS preflight
export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
};
