import { MongoClient, Db } from "mongodb";

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://mongo:27017";
const DB_NAME = process.env.MONGO_DB ?? "mongoDB";

let db: Db | null = null;
let client: MongoClient | null = null;

export const connectToDatabase = async (retries = 5, delayMs = 2000): Promise<Db> => {
  if (db) return db;
    try {
      client = new MongoClient(MONGO_URI);
      await client.connect();
      db = client.db(DB_NAME);
      console.log(`✅ Connected to MongoDB`);
      return db;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt failed`, err);
    }
  throw new Error("Failed to connect to MongoDB");
};
