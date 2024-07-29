import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  favoritesMovies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  likesMovies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isLogin: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
