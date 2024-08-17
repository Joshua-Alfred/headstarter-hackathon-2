const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cheerio = require("cheerio");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());

  server.post("/api/scraper", async (req, res) => {
    const { userUrl } = req.body;
    if (!userUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      const response = await axios.get(userUrl);
      const $ = cheerio.load(response.data);

      // Get the entire HTML content, nicely formatted
      const formattedHtml = $.html();

      // Send the entire HTML content as JSON
      res.json({ html: formattedHtml });
    } catch (error) {
      res.status(500).json({ error: "Failed to scrape the website" });
    }
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
