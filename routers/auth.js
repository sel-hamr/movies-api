import express from "express";
import { validateCreateUser } from "../validators/userValidator.js";
import { createUser, loginUser } from "../controllers/user.js";
const router = express.Router();

router.post("/create-user", validateCreateUser(), createUser);

router.post("/login", loginUser);

export default router;
