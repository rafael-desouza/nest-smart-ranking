import * as mongose from 'mongoose';

export const MatchSchema = new mongose.Schema(
  {
    winner: { type: mongose.Schema.Types.ObjectId, ref: 'Player' },
    loser: { type: mongose.Schema.Types.ObjectId, ref: 'Player' },
    result: [{ set: String }],
  },
  { timestamps: true, collection: 'matches' },
);
