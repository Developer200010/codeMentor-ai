// lib/ai/llmAdapter.js
// OpenRouter adapter with safer JSON extraction + one retry with stricter prompt.

async function callOpenRouter(prompt, key, model = "gpt-3.5-turbo") {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 800,
    }),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`OpenRouter request failed: ${res.status} ${txt}`);
  }
  const data = await res.json();
  const raw = data?.choices?.[0]?.message?.content ?? "";
  return raw;
}

// find the first valid JSON object substring by scanning braces (balanced)
function extractJsonSubstring(text) {
  const start = text.indexOf("{");
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) {
        // return substring that starts at first { and ends here
        return text.slice(start, i + 1);
      }
    }
  }
  return null; // no balanced object found
}

export async function analyzeCodeWithAI(language, code) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("Missing OPENROUTER_API_KEY in .env.local");

  const basePrompt = `
You are CodeMentor, a senior ${language} engineer.
Analyze the code below and return ONLY valid JSON (no text, no explanation, no markdown), with exactly this structure:

{
  "summary": "Brief summary (max 40 words)",
  "issues": [{"line": number, "severity": "low|medium|high", "message": "string"}],
  "improvements": ["string"],
  "refactor": {"explain": "string", "code": "string"}
}

If an array is empty, return an empty array. Use 1-based line numbers.
Code:
\`\`\`${language}
${code}
\`\`\`
`.trim();

  // 1) first try
  let raw = await callOpenRouter(basePrompt, key).catch((err) => {
    throw new Error(`OpenRouter call failed: ${err.message}`);
  });

  // try extracting JSON
  let jsonText = extractJsonSubstring(raw);

  // 2) if extraction failed, retry once with an even stricter instruction (system-style)
  if (!jsonText) {
    console.warn("First attempt: no valid JSON found. Raw output:", raw);
    const retryPrompt = `
You must return ONLY valid JSON and nothing else. No commentary.
Return a single JSON object and make sure it parses with JSON.parse().
Here is the structure you must return:
{"summary":"", "issues":[...], "improvements":[...], "refactor":{"explain":"","code":""}}

Now analyze this code and produce that exact JSON object only.
Code:
\`\`\`${language}
${code}
\`\`\`
`.trim();

    raw = await callOpenRouter(retryPrompt, key).catch((err) => {
      throw new Error(`OpenRouter retry failed: ${err.message}`);
    });

    jsonText = extractJsonSubstring(raw);
  }

  // 3) final: if still no JSON, throw with raw so we can debug easily
  if (!jsonText) {
    console.error("Final failure. Raw model output (first and retry):", raw);
    // include raw so frontend/backend logs show the exact response
    throw new Error(`Model did not return valid JSON. Raw output: ${JSON.stringify(raw).slice(0, 2000)}`);
  }

  // parse and return
  try {
    const parsed = JSON.parse(jsonText);
    // minimal sanity checks (optional)
    if (!parsed || typeof parsed !== "object") throw new Error("Parsed JSON is not an object");
    return parsed;
  } catch (err) {
    // parsing failed despite extracting substring — include raw for debugging
    console.error("JSON.parse error on extracted substring:", jsonText);
    throw new Error(`Failed to parse JSON from model. Error: ${err.message}. Extracted text: ${jsonText}`);
  }
}
