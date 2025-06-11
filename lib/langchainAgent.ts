const apiKey = Deno.env.get("GROQ_API_KEY");
const model = Deno.env.get("GROQ_MODEL");

export async function runAgentOnLogs(logs: string[]): Promise<string> {
  const prompt = `
You are an incident response assistant for backend systems.

Analyze the logs below and answer:
1. What's the likely root cause?
2. Which service is affected?
3. What fix do you recommend?
4. If no issue is found, say 'System is stable.'

Logs:
${logs.join("\n")}
`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a highly technical AI assistant specializing in backend incident diagnosis.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    console.error("Groq Error:", json);
    return "AI analysis failed.";
  }

  return json.choices?.[0]?.message?.content || "No response from model.";
}
