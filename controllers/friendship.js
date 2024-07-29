import Friendship from "../models/Friendship.js";
import User from "../models/user.js";
export const sendFriendRequest = async (req, res) => {
  const recipientId = req.params.recipientId;
  const requesterId = req.user.id;
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    return res.status(404).json({ error: "Recipient not found" });
  }
  const newFriendship = new Friendship({
    recipient: recipientId,
    requester: requesterId,
  });
  try {
    await newFriendship.save();
    return res.status(201).json(newFriendship);
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
};

export const acceptFriendRequest = async (req, res) => {
  const friendshipId = req.params.friendshipId;
  try {
    const friendship = await Friendship.findById(friendshipId);
    if (!friendship) {
      return res.status(404).json({ error: "friendship not found" });
    }
    const requester = await User.findById(friendship.requester);
    if (!requester) {
      return res.status(404).json({ error: "requester not found" });
    }
    friendship.status = "accepted";
    await friendship.save();
    await User.findByIdAndUpdate(friendship.requester, {
      $push: { friends: friendship.recipient },
    });
    await User.findByIdAndUpdate(friendship.recipient, {
      $push: { friends: friendship.requester },
    });
    return res.json(friendship);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const getFriendships = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendships = await Friendship.find({
      $or: [{ recipient: userId }, { requester: userId }],
    });
    res.json(friendships);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectFriendRequest = async (req, res) => {
  const friendshipId = req.params.friendshipId;
  try {
    const friendship = await Friendship.findById(friendshipId);
    if (!friendship) {
      return res.status(404).json({ error: "friendship not found" });
    }
    friendship.status = "declined";
    await friendship.save();
    return res.json(friendship);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
