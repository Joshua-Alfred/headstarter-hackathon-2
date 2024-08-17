const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const puppeteer = require("puppeteer");
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { create, readAll, readOne } = require("./crud");
require("dotenv").config({ path: ".env.local" });

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@headstarter-hackathon-2.3gjkh.mongodb.net/?retryWrites=true&w=majority&appName=headstarter-hackathon-2`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
      const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();

      await page.goto(userUrl, {
        waitUntil: "domcontentloaded",
      });
      const html = await page.content();

      res.json({ html });
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
