// src/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import db from "./models/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Postgres connected");
    // sync models - in production use migrations
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error("Unable to start server:", err);
  }
}
start();
