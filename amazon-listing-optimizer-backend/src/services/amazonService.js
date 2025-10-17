// src/services/amazonService.js
import axios from "axios";
import cheerio from "cheerio";

/**
 * Fetch product HTML from Amazon then extract title, bullets and description.
 * NOTE: This is a quick prototype. Use PA-API for production.
 */
export async function fetchProductByASIN(asin) {
  try {
    const url = `https://www.amazon.in/dp/${asin}`; // change domain if needed
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Bot/1.0; +https://example.com/bot)"
      },
      // consider proxies / timeouts here
    });

    const $ = cheerio.load(data);

    const title = $("#productTitle").text().trim();

    const bullets = [];
    $("#featurebullets_feature_div li, #feature-bullets ul li").each((i, el) => {
      const text = $(el).text().replace(/\s+/g, " ").trim();
      if (text) bullets.push(text);
    });

    const description = $("#productDescription").text().trim() || $("meta[name='description']").attr("content");

    return { title, bullets, description };
  } catch (err) {
    console.error("Error fetching product:", err.message);
    throw new Error("Unable to fetch product details");
  }
}
