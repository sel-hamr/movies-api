import express from "express";
import {
  addComment,
  likeComment,
  updateComment,
  deleteComment,
  unlikeComment,
} from "../controllers/comments.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateComment } from "../validators/commentValidator.js";

const router = express.Router();

router.post("/:movieId", validateComment(), authMiddleware, addComment);

router.post("/:commentId/like", authMiddleware, likeComment);

router.post("/:commentId/unlike", authMiddleware, unlikeComment);

router.put("/:commentId", validateComment(), authMiddleware, updateComment);

router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
