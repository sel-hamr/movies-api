import User from "../models/user.js";
import Friendship from "../models/Friendship.js";
import Message from "../models/message.js";
import { authSocketMiddleware } from "../middleware/authMiddleware.js";

export const socketHandler = (io) => {
  io.use(authSocketMiddleware).on("connection", (socket) => {
    socket.on("send-message", async ({ recipientId, text }) => {
      try {
        const recipient = await User.findById(recipientId);
        if (!recipient) {
          return socket.emit("error", "Recipient not found");
        }
        const friendship = await Friendship.findOne({
          $or: [
            { requester: socket.user.id, recipient: recipientId },
            { requester: recipientId, recipient: socket.user.id },
          ],
        });
        if (!friendship) {
          return socket.emit("error", "You are not friends with this user");
        }
        const message = new Message({
          sender: socket.user.id,
          recipient: recipientId,
          message: text,
        });
        await message.save();
        io.to(recipientId).emit("receive-message", {
          text,
          sender: socket.user.id,
          createAt: message.createdAt,
        });
        socket.emit("receive-message", {
          text,
          recipient: recipientId,
          createAt: message.createdAt,
        });
      } catch (error) {
        socket.emit("error", err.message);
      }
    });
    socket.join(socket.user.id.toString());
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.user.username);
    });
  });
};
