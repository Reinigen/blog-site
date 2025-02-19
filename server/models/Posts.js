const mongoose = require("mongoose");
// Comment Schema
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  commentAuthor: {
    type: String,
    required: [true, "Author is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema({
  postAuthor: {
    type: String,
    required: [true, "User is Required"],
  },
  content: {
    type: String,
    required: [true, "Title is Required"],
  },
  description: {
    type: String,
    required: [true, "Description is Required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("Post", postSchema);
