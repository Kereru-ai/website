
// SCX.AI API Service for Kereru.ai - Sovereign AI Infrastructure
// Uses Cloudflare Function proxy to avoid CORS issues

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    // Call our Cloudflare Function which proxies to SCX.AI
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Chat API Error:", errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.reply || "I'm sorry, I couldn't generate a response.";
    
  } catch (error: any) {
    console.error("Error calling Chat API:", error);
    
    if (error.message?.includes("Failed to fetch")) {
      throw new Error("Unable to connect to the chat service. Please check your internet connection.");
    }
    
    throw new Error("I'm having trouble connecting to the sovereign network right now. Please try again later.");
  }
};
