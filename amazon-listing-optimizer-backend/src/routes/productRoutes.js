// src/routes/productRoutes.js
import express from "express";
import { fetchAndOptimizeProduct } from "../controllers/productController.js";
const router = express.Router();

router.post("/optimize", fetchAndOptimizeProduct);

// history by ASIN
router.get("/history/:asin", async (req, res) => {
  const { asin } = req.params;
  const db = (await import("../models/index.js")).default;
  const records = await db.Product.findAll({ where: { asin }, order: [["createdAt", "DESC"]] });
  res.json(records);
});

export default router;
