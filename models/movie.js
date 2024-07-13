import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  url: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  language: { type: String, required: true },
  genres: { type: [String], required: true },
  status: { type: String, required: true },
  runtime: { type: Number, required: true },
  premiered: { type: Date, required: true },
  officialSite: { type: String, required: true },
  schedule: {
    time: { type: String, required: true },
    days: { type: [String], required: true },
  },
  rating: {
    average: { type: Number, required: true },
  },
  weight: { type: Number, required: true },
  network: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    country: {
      name: { type: String, required: true },
      code: { type: String, required: true },
      timezone: { type: String, required: true },
    },
  },
  externals: {
    tvrage: { type: Number, required: true },
    thetvdb: { type: Number, required: true },
    imdb: { type: String, required: true },
  },
  image: {
    medium: { type: String, required: true },
    original: { type: String, required: true },
  },
  summary: { type: String, required: true },
  updated: { type: Number, required: true },
  _links: {
    self: {
      href: { type: String, required: true },
    },
    previousepisode: {
      href: { type: String, required: true },
    },
  },
});

export default mongoose.model("Movie", movieSchema);
