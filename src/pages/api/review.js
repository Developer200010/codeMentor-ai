// pages/api/review.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { code, language, filename } = req.body || {};

  if (!code || !language) {
    return res.status(400).json({ error: "Missing `code` or `language` in body" });
  }

  // In the real app we'll compute a hash, check cache, call LLM, validate JSON, store in DB...
  // For now return a static sample review that matches the final schema.
  const sampleReview = {
    summary: "Off-by-one loop error; use '<' instead of '<=' or use reduce().",
    issues: [
      { line: 3, severity: "high", message: "Loop iterates one too many times: 'i <= arr.length' should be 'i < arr.length'." },
      { line: 2, severity: "low", message: "Use Array.prototype.reduce for conciseness and fewer edge cases." }
    ],
    security: ["No direct user input executed; however, ensure inputs are validated when used elsewhere."],
    improvements: ["Use reduce()", "Add input checks", "Return 0 for empty or invalid input."],
    refactor: {
      explain: "Refactored to use reduce and guard against non-array inputs.",
      code: `function sum(arr = []) {
  if (!Array.isArray(arr)) return 0;
  return arr.reduce((acc, v) => acc + (Number(v) || 0), 0);
}`
    },
    eli5: "Your loop goes one step too far and reads a value that doesn't exist; use '<' or reduce."
  };

  // Simulate slight delay to mimic real API/LLM latency
  await new Promise((r) => setTimeout(r, 450));

  return res.status(200).json({ review: sampleReview });
}
