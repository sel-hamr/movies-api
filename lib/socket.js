import User from "../models/user.js";
import Friendship from "../models/Friendship.js";
import Message from "../models/message.js";
import Group from "../models/group.js";
import Notification from "../models/notification.js";
import Comment from "../models/comment.js";
import { authSocketMiddleware } from "../middleware/authMiddleware.js";

export const socketHandler = (io) => {
  io.use(authSocketMiddleware).on("connection", (socket) => {
    User.findByIdAndUpdate(socket.user.id, { isLogin: true });
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
    socket.on("like-comment", async ({ commentId }) => {
      try {
        const comment = await Comment.findById(commentId).populate("userId");
        if (!comment) {
          return socket.emit("error", "Comment not found");
        }
        const notification = new Notification({
          recipient: comment.userId._id,
          sender: socket.user.id,
          type: "like",
          content: "liked your comment",
        });
        await notification.save();
        io.to(comment.userId._id.toString()).emit("receive-notification", {
          sender: socket.user.id,
          type: "like",
          content: "liked your comment",
        });
      } catch (error) {
        console.log("error", error);
        socket.emit("error", error.message);
      }
    });
    socket.on("join-group", async ({ groupId }) => {
      try {
        const group = await Group.findById(groupId);
        if (!group) {
          return socket.emit("error", "Group not found");
        }
        if (!group.members.includes(socket.user.id)) {
          return socket.emit("error", "You are not a member of this group");
        }
        socket.join(groupId.toString());

        io.to(groupId.toString()).emit("receive-message", {
          sender: "Admin",
          text: `${socket.user.email} joined the group`,
        });
      } catch (error) {
        socket.emit("error", error.message);
        console.log("error", error);
      }
    });
    socket.on("send-group-message", async ({ groupId, text }) => {
      try {
        const group = await Group.findById(groupId);
        if (!group) {
          return socket.emit("error", "Group not found");
        }
        if (!group.members.includes(socket.user.id)) {
          return socket.emit("error", "You are not a member of this group");
        }
        io.to(groupId.toString()).emit("receive-message", {
          sender: socket.user.id,
          text,
        });
      } catch (error) {
        socket.emit("error", error.message);
        console.log("error", error);
      }
    });
    socket.join(socket.user.id.toString());
    socket.on("disconnect", () => {
      User.findByIdAndUpdate(socket.user.id, { isLogin: false });
      console.log("A user disconnected:", socket.user.username);
    });
  });
};
