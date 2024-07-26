import { validationResult } from "express-validator";
import Movie from "../models/movie.js";
import Comment from "../models/comment.js";
export const addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const movieId = req.params.movieId;
  const { text } = req.body;
  const user = req.user;
  const movie = await Movie.findOne({ id: Number(movieId) });
  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }
  const comment = new Comment({
    text,
    userId: user.id,
    movieId: movie._id,
  });
  try {
    comment.save();
    movie.comments.push(comment._id);
    await movie.save();
    res.status(201).json({ message: "Comment added" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likeComment = async (req, res) => {
  const commentId = req.params.commentId;
  const user = req.user;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  if (comment.likes.includes(user.id)) {
    return res.status(400).json({ error: "Comment already liked" });
  }
  comment.likes.push(user.id);
  try {
    await comment.save();
    res.status(200).json({ message: "Comment liked" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const commentId = req.params.commentId;
  const { text } = req.body;
  const user = req.user;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }
  if (comment.userId.toString() !== user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  comment.text = text;
  try {
    await comment.save();
    res.status(200).json({ message: "Comment updated" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const unlikeComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;

  const comment = await Comment.findById(commentId);
  if (!comment) res.status(404).json({ error: "Comment not found" });

  comment.likes.filter((_userId) => _userId.toString() !== userId);
  try {
    await comment.save();
    res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
