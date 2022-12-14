import { movieType } from "./../types";
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
      adult: Boolean,
      backdrop_path: String,
      budget: Number,
      homepage: String,
      id: Number,
      imdb_id: String,
      original_language: String,
      original_title: String,
      overview: String,
      popularity: Number,
      poster_path: String,
      release_date: String,
      revenue: Number,

      status: String,
      tagline: String,
      title: String,
      video: Boolean,
      vote_average: Number,
      vote_count: Number,
    },
  ],
});

export const User = mongoose.model("user", userSchema);
