const Posts = require("../models/Posts");

module.exports.getPost = (req, res) => {
  const postId = req.params.id;
  Posts.findById(postId)
    .then((post) => {
      if (post) {
        return res.status(200).send({ success: true, message: post });
      } else {
        return res.status(404).send({ message: "Post not found" });
      }
    })
    .catch((err) => res.status(500).send({ message: "Error finding Post." }));
};

module.exports.getAllPosts = (req, res) => {
  Posts.find({})
    .then((Posts) => {
      if (Posts.length > 0) {
        return res.status(200).send({ Posts });
      } else {
        return res.status(200).send({ message: "No Posts found." });
      }
    })
    .catch((err) => res.status(500).send({ message: "Error finding Posts." }));
};

module.exports.addPost = (req, res) => {
  let newPost = new Posts({
    userId: req.user.id,
    title: req.body.title,
    description: req.body.description,
  });
  newPost
    .save()
    .then((savedPost) => res.status(201).send(savedPost))
    .catch((saveErr) => {
      console.error("Error in saving the Post: ", saveErr);
      return res.status(500).send({ error: "Failed to save the Post" });
    });
};

module.exports.updatePost = (req, res) => {
  const postId = req.params.id;
  let updatedPost = new Posts({
    title: req.body.title,
    description: req.body.description,
  });
  Posts.findByIdAndUpdate(postId, updatedPost)
    .then((post) => {
      if (post) {
        return res
          .status(200)
          .send({ success: true, message: "Post updated successfully" });
      } else {
        return res.status(404).send({ message: "Post not found" });
      }
    })
    .catch((err) => res.status(500).send({ error: "Error finding Post." }));
};

module.exports.deletePost = (req, res) => {
  return Posts.deleteOne({ _id: req.params.id })
    .then((deletedPost) => {
      if (deletedPost < 1) {
        return res.status(400).send({ error: "No Post deleted" });
      }
      return res.status(200).send({ message: "Post deleted successfully" });
    })
    .catch((err) => {
      console.error("Error in deleting a post : ", err);
      return res.status(500).send({ error: "Error in deleting a Post." });
    });
};
