import Movie from "../models/movie.js";
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
