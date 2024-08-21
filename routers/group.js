import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getGroups,
  createGroups,
  joinGroup,
  leaveGroup,
} from "../controllers/group.js";

const router = express.Router();

router.get("/", authMiddleware, getGroups);
router.post("/", authMiddleware, createGroups);
router.post("/join/:idGroup", authMiddleware, joinGroup);
router.post("/leave/:idGroup", authMiddleware, leaveGroup);

export default router;
