// src/services/aiService.js
import { generateWithGemini } from "../config/gemini.js";

export async function optimizeListing(productData) {
  const prompt = `
You are an Amazon listing optimization assistant.

Input:
Title: ${productData.title || ""}
Bullets:
${(productData.bullets || []).map(b => `- ${b}`).join("\n")}
Description: ${productData.description || ""}

Output a JSON like this:
{
  "optimizedTitle": "...",
  "optimizedBullets": ["...", "..."],
  "optimizedDescription": "...",
  "keywordSuggestions": ["...", "..."]
}
`;

  const text = await generateWithGemini(prompt);

  // try to parse JSON from Gemini output
  try {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
  } catch (e) {
    console.error("Failed to parse Gemini response as JSON:", e);
  }

  return { raw: text };
}
