import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IEvent extends Document {
  uniqueId: string;
  name: string;
  dates: string[];
  votes: {
    date: string;
    people: string[];
  }[];
}

const EventSchema: Schema = new Schema({
  uniqueId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  dates: [
    {
      type: String,
      required: true,
    },
  ],
  votes: [
    {
      date: {
        type: String,
        required: true,
      },
      people: [
        {
          type: String,
        },
      ],
    },
  ],
});

const Event = mongoose.model<IEvent>('Event', EventSchema);
export default Event;
