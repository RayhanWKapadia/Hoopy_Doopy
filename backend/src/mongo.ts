import { MongoClient, Db } from "mongodb";

let db: Db | null = null;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) return db;

  const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  await client.connect();
  db = client.db("my_database"); // choose your DB name

  console.log("✅ Connected to MongoDB");
  return db;
};
