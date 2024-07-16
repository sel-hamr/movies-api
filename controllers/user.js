import { validationResult } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/jwt.js";

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const payload = {
    favoritesMovies: [],
    likesMovies: [],
    password: hashedPassword,
  };
  const user = await User.create({ username, email, ...payload });

  try {
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      data: { username, email },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Login failed" });
    }
    const token = generateToken(user);
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
