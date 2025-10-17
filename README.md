# 🛍️ SalesDuo Product Optimizer

## 📌 Overview

SalesDuo Product Optimizer is a full‑stack application that allows users to fetch product details from Amazon using an ASIN, optimize the product content (title, bullets, description, keywords) using Google's **Gemini AI**, and store both original and optimized data in a **PostgreSQL** database. Users can also view the **history of optimizations** for any ASIN.

## 🏗️ Tech Stack

* **Frontend**: React.js (Vite or CRA)
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL with Sequelize ORM
* **AI Integration**: Google Gemini API
* **Web Scraping**: Puppeteer

## ⚡ Features

* ✅ Fetch Amazon product details using ASIN
* ✨ Optimize product content using Gemini API
* 🧠 Store original and optimized data in PostgreSQL
* 📜 View optimization history for each ASIN
* 🖼️ Simple and clean frontend UI

## 📁 Project Structure

```
project-root/
│── backend/
│   ├── app.js                  # Express server entry
│   ├── config.js               # Sequelize database configuration
│   ├── models/
│   │   └── product.js          # Product model
│   ├── controllers/
│   │   └── productController.js# Business logic
│   ├── routes/
│   │   └── productRoutes.js    # API routes
│   ├── utils/
│   │   └── gemini.js           # Gemini AI integration
│   └── package.json
│
│── frontend/
│   ├── src/App.js              # Main UI
│   ├── components/             # UI components
│   └── package.json
│
└── README.md
```

## 🔑 Environment Variables

Create a `.env` file in the backend directory with:

```
DB_NAME=YOUR_DB_NAME
DB_USER=YOUR_DB_USER
DB_PASS=yourpassword
DB_HOST=localhost
DB_SSL=false
GEMINI_API_KEY=your_gemini_api_key
```

## ⚙️ Backend Setup

```bash
cd amazon-listing-optimizer-backend
npm install
npm run dev
```

* The server runs on `http://localhost:5000`.
* Database tables will be auto‑created using Sequelize.

## 🧪 Frontend Setup

```bash
cd salesduo-frontend
npm install
npm run dev
```

* The frontend runs on `http://localhost:3000`.

## 🔄 API Endpoints

* `POST /api/optimize` → Fetches & optimizes product by ASIN, saves in DB

  ```json
  {
    "asin": "B0CQ2VKBMH"
  }
  ```
* `GET /api/history/:asin` → Returns all past optimizations for a given ASIN

## 🧭 Project Flow

1. User enters ASIN on the frontend.
2. Frontend sends `POST` request to backend (`/api/optimize`).
3. Backend uses **Puppeteer** to scrape product details from Amazon.
4. Details are passed to **Gemini API** to generate optimized content.
5. Original + Optimized content are saved in **PostgreSQL** via Sequelize.
6. User can click **“View Past”** to fetch history from `/api/history/:asin`.
7. History is displayed in a modal popup.

## 🧰 Database Schema (Product Table)

| Column                | Type   |
| --------------------- | ------ |
| asin                  | STRING |
| original_title        | TEXT   |
| original_bullets      | TEXT   |
| original_description  | TEXT   |
| optimized_title       | TEXT   |
| optimized_bullets     | TEXT   |
| optimized_description | TEXT   |
| keywords              | TEXT   |
| createdAt             | DATE   |
| updatedAt             | DATE   |

## 🚀 Future Enhancements

* 🔍 Bulk ASIN optimization
* 📊 Analytics on keyword performance
* 🧭 Multi‑marketplace support
* 💾 Export optimized data to CSV

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.


