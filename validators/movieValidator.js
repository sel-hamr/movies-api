import { checkSchema } from "express-validator";
const validateQueryGetMovies = () =>
  checkSchema({
    limit: {
      optional: true,
      isInt: {
        options: { min: 1 },
        errorMessage: "Limit must be a positive integer",
      },
      toInt: true,
    },
    page: {
      optional: true,
      isInt: {
        errorMessage: "Page must be a positive integer",
        options: { min: 1 },
      },
      toInt: true,
    },
    orderBy: {
      isIn: {
        options: ["1", "-1"],
        errorMessage: "Order must be either -1 or 1",
      },
      toInt: true,
    },
    sortBy: {
      optional: true,
      isString: {
        errorMessage: "Sort must be a string",
      },
      isIn: {
        options: ["id", "name", "language", "status", "runtime", "weight"],
        errorMessage:
          "Sort must be one of id, name, language, status, runtime, weight",
      },
    },
  });

export { validateQueryGetMovies };
