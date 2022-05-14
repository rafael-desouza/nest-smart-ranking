import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String },
    ranking: { type: String },
    rankPosition: { type: Number },
    urlPlayerPhoto: { type: String },
  },
  { timestamps: true, collection: 'players' },
);
