const express = require('express');
const next = require('next')
const { MongoClient, ServerApiVersion } = require('mongodb');
;
const { create, readAll, readOne } = require('./crud');
require('dotenv').config({ path: '.env.local' });

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@headstarter-hackathon-2.3gjkh.mongodb.net/?retryWrites=true&w=majority&appName=headstarter-hackathon-2`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
