import { PORTFOLIO_SYSTEM_PROMPT } from '@/lib/portfolio_context';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: PORTFOLIO_SYSTEM_PROMPT },
          ...messages,
        ],
        max_tokens: 300,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq error:', error);
      return new Response('Error connecting to AI service', { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? 'No response received.';

    return new Response(content, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (err) {
    console.error('Chat route error:', err);
    return new Response('Error connecting to AI service', { status: 500 });
  }
}