const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    message: String,
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
