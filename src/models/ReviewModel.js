// models/Review.js
const { Schema, model, models } = require("mongoose");

const IssueSchema = new Schema({
  line: { type: Number, required: true },
  severity: { type: String, enum: ["low", "medium", "high"], required: true },
  message: { type: String, required: true },
}, { _id: false });

const RefactorSchema = new Schema({
  explain: { type: String, required: true },
  code: { type: String, required: true },
}, { _id: false });

const ReviewSchema = new Schema({
  language: { type: String, required: true },
  filename: { type: String, default: null },
  code: { type: String, required: true },
  review: {
    summary: { type: String, required: true },
    issues: { type: [IssueSchema], default: [] },
    improvements: { type: [String], default: [] },
    refactor: { type: RefactorSchema, required: true },
    eli5: { type: String, default: "" },
  },
  meta: {
    aiProvider: { type: String, default: "openrouter" },
    fromCache: { type: Boolean, default: false },
  },
  createdAt: { type: Date, default: () => new Date() },
}, { timestamps: false });

/**
 * Important: next.js + hot reload can re-evaluate this file multiple times.
 * Use models.Review if already compiled to avoid OverwriteModelError.
 */
module.exports = models.Review || model("Review", ReviewSchema);
