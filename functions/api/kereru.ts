
// Cloudflare Function to proxy requests to Together AI
// Secures the API key from frontend exposure

interface Env {
    TOGETHER_API_KEY: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
    const { request, env } = context;

    // Check if API key is configured
    if (!env.TOGETHER_API_KEY) {
        return new Response(JSON.stringify({
            error: 'Configuration Error',
            message: 'TOGETHER_API_KEY is not set in environment variables'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    try {
        const body = await request.json();

        // Forward request to Together AI
        const response = await fetch('https://api.together.xyz/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.TOGETHER_API_KEY}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Together AI API Error:', response.status, errorText);
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
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error: any) {
        console.error('Proxy Error:', error);
        return new Response(JSON.stringify({
            error: 'Internal Proxy Error',
            message: error.message
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
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
};
