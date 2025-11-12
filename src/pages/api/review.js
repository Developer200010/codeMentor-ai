import { analyzeCodeWithAI } from "../../lib/ai/llmAdapter.js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Use POST" });

  const { code, language } = req.body || {};
  if (!code || !language)
    return res.status(400).json({ error: "Missing code or language" });

  try {
    const review = await analyzeCodeWithAI(language, code);
    return res.status(200).json({ review });
  } catch (err) {
    console.error("AI error:", err);
    return res
      .status(500)
      .json({ error: "AI failed to analyze code", details: err.message });
  }
}
