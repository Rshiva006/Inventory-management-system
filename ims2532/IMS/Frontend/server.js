import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;
const mongoUri = 'mongodb://localhost:27017';
const client = new MongoClient(mongoUri);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db('Inventory');
    const collection = database.collection('IMS data');

    // Set up an endpoint to get data from MongoDB
    app.get('/data', async (req, res) => {
      try {
        const data = await collection.find({}).toArray();
        res.json(data);
      } catch (error) {
        res.status(500).send(error.toString());
      }
    });

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
