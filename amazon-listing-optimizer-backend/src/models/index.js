// src/models/index.js
import sequelize from "../config/db.js";
import Product from "./Product.js";

const db = { sequelize, Product };

export default db;
