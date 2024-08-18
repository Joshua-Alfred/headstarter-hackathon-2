const express = require("express");
const { Request, Response } = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const puppeteer = require("puppeteer");
const { executablePath } = require('puppeteer-core');
const path = require("path");
const { MongoClient, ServerApiVersion } = require("mongodb");
const { create, readAll, readOne } = require("./crud");
require("dotenv").config({ path: ".env.local" });
const {
  startMetricsServer,
  responseTimeHistogram,
} = require("./utils/metrics");
const responseTime = require("response-time");

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

  startMetricsServer();

  server.use(
    responseTime((req, res, time) => {
      responseTimeHistogram.observe(
        {
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time * 1000
      );
    })
  );

  server.use(bodyParser.json());

  server.post("/api/scraper", async (req, res) => {
    const { userUrl } = req.body;
    if (!userUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        
      });
      
      const page = await browser.newPage();

      await page.goto(userUrl, {
        waitUntil: "domcontentloaded",
      });
      const title = await page.title();
      const html = await page.content();

      const document = {
      title: title,
      url: userUrl,
      content: html,
    };

    // Insert the document into MongoDB
    const result = await create(client, document);
    console.log(`Inserted document with _id: ${result.insertedId}`);

    await browser.close();
    res.json({ html });
  } catch (error) {
      console.error("Scraping error:", error);
      res.status(500).json({ error: "Failed to scrape the website", details: error.message });
    }
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
