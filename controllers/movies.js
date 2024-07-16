import Movie from "../models/movie.js";
import User from "../models/user.js";
import { createFilter } from "../lib/filter.js";
import { validateQueryGetMovies } from "../lib/validation.js";

export const getMovies = async (req, res) => {
  try {
    const {
      limit = 10,
      page = 1,
      orderBy = 1,
      sortBy = "id",
      ...query
    } = req.query;

    if (!validateQueryGetMovies({ limit, page, orderBy, sortBy }))
      return res
        .status(400)
        .json({ error: "Invalid limit or page or sort or order" });
    const filter = createFilter(query);
    const movies = await Movie.find(filter)
      .limit(limit)
      .sort({ [sortBy]: parseInt(orderBy) })
      .skip((page - 1) * limit);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOne({ id: Number(id) });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addFavoriteMovie = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const movie = await Movie.findOne({ id: Number(id) });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    user.favoritesMovies.push(movie._id);
    await user.save();
    res.json({ message: "Movie added to favorites" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFavoriteMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("favoritesMovies");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user?.favoritesMovies || []);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
