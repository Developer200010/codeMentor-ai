// pages/api/review.js
import { analyzeCodeWithAI } from "../../lib/ai/llmAdapter.js";
import { connectMongoose } from "../../config/db.js";
import ReviewModel from "../../models/ReviewModel.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const { code, language, filename, save } = req.body || {};

  if (!code || typeof code !== "string" || !language || typeof language !== "string") {
    return res.status(400).json({ error: "Missing or invalid `code` or `language` in body" });
  }

  try {
    // call AI
    const review = await analyzeCodeWithAI(language, code);

    if (!review || typeof review !== "object") {
      return res.status(500).json({ error: "AI returned invalid review" });
    }

    // optional: persist using mongoose
    let savedDoc = null;
    if (save) {
      try {
        await connectMongoose();
        // create document
        savedDoc = await ReviewModel.create({
          language,
          filename: filename || null,
          code,
          review,
          meta: { aiProvider: process.env.AI_PROVIDER || "openrouter", fromCache: false },
        });
      } catch (dbErr) {
        console.error("Mongoose save failed:", dbErr);
        // don't break the response - still return review
      }
    }

    return res.status(200).json({ review, saved: !!savedDoc, inserted: savedDoc ? { id: savedDoc._id } : null });
  } catch (err) {
    console.error("AI error:", err);
    return res.status(500).json({ error: "AI failed to analyze code", details: String(err) });
  }
}
