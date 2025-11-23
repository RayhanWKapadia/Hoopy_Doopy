import mongoose from "mongoose";

export interface Player {
  _id?: mongoose.Types.ObjectId;
  name: string;
  level: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const playerSchema = new mongoose.Schema<Player>(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, required: true, min: 1, default: 1 },
  },
  { timestamps: true }
);

export const PlayerModel = mongoose.model<Player>("Player", playerSchema);