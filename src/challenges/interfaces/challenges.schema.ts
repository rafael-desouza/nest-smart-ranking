import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    status: { type: String },
    challengeDate: { type: Date },
    requestChallengeDate: { type: Date },
    answerChallengeDate: { type: Date },
    challenger: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    challenged: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  },
  { timestamps: true, collection: 'challenges' },
);
