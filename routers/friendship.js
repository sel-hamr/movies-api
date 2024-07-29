import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  getFriendships,
  rejectFriendRequest,
} from "../controllers/friendship.js";

const router = express.Router();

router.post("/request/:recipientId", authMiddleware, sendFriendRequest);

router.post("/accept/:friendshipId", authMiddleware, acceptFriendRequest);

router.post("/reject/:friendshipId", authMiddleware, rejectFriendRequest);

router.get("/", authMiddleware, getFriendships);

export default router;
