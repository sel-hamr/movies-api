import express from "express";
import movieRouter from "./routers/movies.js";
import userRouter from "./routers/auth.js";
import commentRouter from "./routers/comment.js";
import friendshipRouter from "./routers/friendship.js";
import { createServer } from "node:http";
import connectDB from "./lib/db.js";
import { logs } from "./middleware/logs.js";
import { errorHandler } from "./middleware/error.js";
import { Server } from "socket.io";
import { socketHandler } from "./lib/socket.js";

const app = express();

const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

connectDB();
app.use(logs);
app.use(express.json());
app.use("/api/movies", movieRouter);
app.use("/api/auth", userRouter);
app.use("/api/comments", commentRouter);
app.use("/api/friendship", friendshipRouter);

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

socketHandler(io);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
