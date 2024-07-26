import { checkSchema } from "express-validator";

export const validateComment = () =>
  checkSchema({
    text: {
      notEmpty: {
        errorMessage: "Comment text is required",
      },
      isString: {
        errorMessage: "Comment text must be a string",
      },
    },
  });
