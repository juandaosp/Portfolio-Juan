'use server';

import portfolioData from '@/data/portfolio_data.json';

export async function chatWithJuanProxy(messages: any[]) {
  // Logic: Filter your JSON for keywords found in the user message
  const lastMessage = messages[messages.length - 1].content.toLowerCase();
  
  // Find relevant evidence in your Jira data
  const relevantSkill = portfolioData.skills_hierarchy.find(s => 
    s.skill.toLowerCase().includes(lastMessage) || 
    s.projects.some(p => lastMessage.includes(p.toLowerCase()))
  );

  const evidence = relevantSkill 
    ? `He has ${relevantSkill.total_points} points in ${relevantSkill.skill}. Key work: ${relevantSkill.highlights[0].summary}`
    : "Juan has delivered 822.5 story points across Morningstar platforms.";

  // Here you would call your API (Groq/OpenAI)
  // For now, returning structured simulated response:
  return {
    role: 'assistant',
    content: `Based on Juan's Morningstar Jira data: ${evidence}. How can I help you with more specifics?`
  };
}