import mongoose, { Schema, Document } from 'mongoose';

interface IVote extends Document {
  eventId: string; // Changed to String
  date: string;
  people: string[];
}

const VoteSchema: Schema = new Schema({
  eventId: { type: String, ref: 'Event', required: true }, // Changed to String
  date: { type: String, required: true },
  people: { type: [String], required: true },
});

export default mongoose.model<IVote>('Vote', VoteSchema);
