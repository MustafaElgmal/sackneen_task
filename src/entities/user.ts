import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteMovies: [
    {
      name: String,
      description: String,
      profilePath: String,
      coverPath: String,
    },
  ],
});

export const User = mongoose.model("user", userSchema);
