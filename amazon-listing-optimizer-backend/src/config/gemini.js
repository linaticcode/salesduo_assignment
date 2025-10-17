// src/config/gemini.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

/**
 * Base Gemini API URL (from your provided endpoint)
 * ⚠️ It's better to store the key in .env and not hardcode it in the URL!
 */
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_MODEL = "gemini-2.0-flash";

/**
 * Generate content using Gemini
 * @param {string} prompt - The text prompt for Gemini
 * @returns {Promise<string>} - Model output text
 */
export async function generateWithGemini(prompt) {
  try {
    const response = await axios.post(
      `${GEMINI_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const candidates = response.data?.candidates;
    const text = candidates?.[0]?.content?.parts?.[0]?.text;

    return text || "No response from Gemini";
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message);
    throw new Error("Failed to generate content with Gemini");
  }
}
