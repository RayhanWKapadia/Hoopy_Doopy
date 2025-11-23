import { Db } from "mongodb";

export const listItems = async (db: Db) => {
  return db.collection("items").find().toArray();
};

export const createItem = async (db: Db, data: any) => {
  const res = await db.collection("items").insertOne(data);
  return { _id: res.insertedId, ...data };
};