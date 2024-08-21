import Group from "../models/group.js";

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("userId", {
      username: true,
    });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createGroups = async (req, res) => {
  const user = req.user;
  const { name } = req.body;
  const group = new Group({
    name,
    userId: user.id,
  });
  try {
    group.save();
    res.status(201).json({ message: "group added" });
  } catch (error) {}
};

export const joinGroup = async (req, res) => {
  const user = req.user;
  const { idGroup } = req.params;
  try {
    const group = await Group.findById(idGroup);
    if (!group) res.status(404).json({ message: "group not found" });
    group.members.push(user.id);
    group.save();
    res.status(200).json({ message: "your join the group" });
  } catch (error) {}
};

export const leaveGroup = async (req, res) => {
  const user = req.user;
  const { idGroup } = req.params;
  try {
    const group = await Group.findById(idGroup);
    if (!group) res.status(404).json({ message: "group not found" });
    group.members.pull(user.id);
    group.save();
    res.status(200).json({ message: "your leave the group" });
  } catch (error) {}
};
