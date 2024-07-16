import { checkSchema } from "express-validator";
import User from "../models/user.js";

const validateCreateUser = () =>
  checkSchema({
    username: {
      isString: {
        errorMessage: "Username must be a string",
      },
      isLength: {
        options: { min: 3 },
        errorMessage: "Username must be at least 3 characters long",
      },
    },
    email: {
      isEmail: {
        errorMessage: "Must be a valid email address",
      },
      custom: {
        options: async (email) => {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            throw new Error("Email already in use");
          }
        },
      },
    },
    password: {
      isLength: {
        options: { min: 6 },
        errorMessage: "Password must be at least 6 characters long",
      },
    },
  });

export { validateCreateUser };
