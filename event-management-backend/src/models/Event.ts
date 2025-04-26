import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  description: string;
  images: string[];
  startDate: Date;
  endDate: Date;
  location: string;
  totalGuests?: number;
  category?: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  totalGuests: { type: Number },
  category: { type: String },
}, { timestamps: true });

export default mongoose.model<IEvent>('Event', EventSchema);
