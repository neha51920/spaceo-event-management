import mongoose, { Document, Schema } from 'mongoose';

// Define interface for User
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Create the User Schema
const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
