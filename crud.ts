import { MongoClient } from "mongodb";

export async function create(
  client: MongoClient,

  // The document to be inserted
  // If no document is provided, a default example document will be inserted
  document: Object = {
    title: "Example Webpage",
    url: "https://example.com",
    content: "This is an example webpage content.",
  }
  // to be removed

) {
  try {
    // Connect the client to the server
    await client.connect();

    // Get a reference to the database
    const database = client.db("hackathon");

    // Get a reference to the collection
    const collection = database.collection("webpages");

    // Insert the document into the collection
    const result = await collection.insertOne(document);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function readAll(client: MongoClient) {
  try {
    await client.connect();
    const database = client.db("hackathon");
    const collection = database.collection("webpages");

    const allDocuments = await collection.find({}).toArray();
    return allDocuments;
  } finally {
    await client.close();
  }
}

export async function readOne(client: MongoClient, query: Object = {}) {
  try {
    await client.connect();
    const database = client.db("hackathon");
    const collection = database.collection("webpages");

    const oneDocument = await collection.findOne(query);
    return oneDocument;
  } finally {
    await client.close();
  }
}
