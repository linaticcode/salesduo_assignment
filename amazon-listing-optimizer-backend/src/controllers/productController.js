// src/controllers/productController.js
import { fetchProductByASIN } from "../services/amazonService.js";
import { optimizeListing } from "../services/aiService.js";
import db from "../models/index.js";

export async function fetchAndOptimizeProduct(req, res) {
  try {
    const { asin } = req.body;
    if (!asin) return res.status(400).json({ error: "ASIN required" });

    // 1) Fetch product details
    const productData = await fetchProductByASIN(asin);

    // 2) Call AI to optimize
    const optimized = await optimizeListing(productData);

    // 3) Save to DB
    const saved = await db.Product.create({
      asin,
      originalTitle: productData.title,
      originalBullets: productData.bullets,
      originalDescription: productData.description,
      optimizedTitle: optimized.optimizedTitle || null,
      optimizedBullets: optimized.optimizedBullets || null,
      optimizedDescription: optimized.optimizedDescription || null,
      keywordSuggestions: optimized.keywordSuggestions || null,
    });

    // 4) Return both original and optimized
    return res.json({ original: productData, optimized, savedId: saved.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
