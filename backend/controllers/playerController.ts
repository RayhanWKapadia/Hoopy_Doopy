import { Db } from "mongodb";

export const listPlayers = async (db: Db, season?: string) => {
  const filter = season ? { SEASON: season } : {};
  return db.collection("player_basic_stats").find(filter).limit(100).toArray();
};
