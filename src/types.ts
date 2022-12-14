import { Request } from "express";
import { ObjectId } from "mongoose";

export interface userCreateType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface userType extends userCreateType {
  favoriteMovies: {
    id?: number | undefined;
    adult?: boolean | undefined;
    backdrop_path?: string | undefined;
    budget?: number | undefined;
    homepage?: string | undefined;
    imdb_id?: string | undefined;
    original_language?: String,
    original_title?: string|undefined,
    overview?: string|undefined,
    popularity?: number|undefined,
    poster_path?: string|undefined,
    release_date?: string|undefined,
    revenue?: number|undefined,

    status?: string|undefined,
    tagline?: string|undefined,
    title?: string|undefined,
    video?: Boolean,
    vote_average?: number|undefined,
    vote_count?: number|undefined,
  }[];
}
export interface RequestAuthType extends Request {
  user?: userType;
}

export interface movieType {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection: null;
  budget?: number;
  genres?: { id: number; name: string }[];
  homepage?: string | null;
  id?: number;
  imdb_id?: string | null;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: {
    id: number;
    logo: string;
    name: string;
    origin_counter: string;
  }[];
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status?: string;
  tagline?: string | null;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
