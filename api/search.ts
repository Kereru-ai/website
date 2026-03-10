// Vercel Serverless Function for Tavily Search
import type { VercelRequest, VercelResponse } from '@vercel/node';

const TAVILY_API_KEY = "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";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Call Tavily API with NZ-focused domains
    const tavilyResponse = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: TAVILY_API_KEY,
        query: query,
        search_depth: 'advanced',
        include_domains: ['govt.nz', 'co.nz', 'org.nz', 'ac.nz'],
        max_results: 5
      })
    });

    if (!tavilyResponse.ok) {
      throw new Error(`Tavily API error: ${tavilyResponse.status}`);
    }

    const data = await tavilyResponse.json();
    return res.status(200).json({ results: data.results || [] });

  } catch (error) {
    console.error('Search API error:', error);
    return res.status(500).json({ 
      error: 'Failed to perform search',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
