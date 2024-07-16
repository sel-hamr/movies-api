import express from "express";
import { getMovies, getMovieById } from "../controllers/movies.js";
import { addFavoriteMovie, getFavoriteMovies } from "../controllers/movies.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateQueryGetMovies } from "../validators/movieValidator.js";

const router = express.Router();

router.get("/", validateQueryGetMovies(), getMovies);

router.get("/favorite", authMiddleware, getFavoriteMovies);

router.post("/favorite/:id", authMiddleware, addFavoriteMovie);

router.get("/:id", getMovieById);

export default router;
