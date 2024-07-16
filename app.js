import express from "express";
import movieRouter from "./routers/movies.js";
import userRouter from "./routers/auth.js";
import connectDB from "./lib/db.js";
import { logs } from "./middleware/logs.js";

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();
app.use(logs);
app.use(express.json());
app.use("/api/movies", movieRouter);
app.use("/api/auth", userRouter);

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
