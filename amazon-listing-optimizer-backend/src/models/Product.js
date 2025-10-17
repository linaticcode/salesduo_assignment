// src/models/Product.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define("Product", {
  asin: { type: DataTypes.STRING, allowNull: false },
  originalTitle: DataTypes.TEXT,
  originalBullets: DataTypes.JSONB,
  originalDescription: DataTypes.TEXT,
  optimizedTitle: DataTypes.TEXT,
  optimizedBullets: DataTypes.JSONB,
  optimizedDescription: DataTypes.TEXT,
  keywordSuggestions: DataTypes.ARRAY(DataTypes.STRING),
}, {
  timestamps: true
});

export default Product;
