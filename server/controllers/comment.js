const Posts = require("../models/Posts");

module.exports.getComments = (req, res) => {
  const postId = req.params.id;
  Posts.findById(postId)
    .then((post) => {
      let comments = post.comments;
      if (comments.length > 0) {
        return res.status(200).send({ comments });
      } else {
        return res.status(200).send({ message: "No Comments found." });
      }
    })
    .catch((err) => res.status(500).send({ message: "Error finding Post." }));
};

module.exports.addComment = (req, res) => {
  const postId = req.params.id;
  const newComment = {
    text: req.body.text,
    commentAuthor: req.user.id,
  };
  Posts.findByIdAndUpdate(postId, (err, post) => {
    if (err) throw err;

    post.comments.push(newComment);

    post
      .save()
      .then((savedPost) => res.status(201).send(savedPost))
      .catch((saveErr) => {
        console.error("Error in saving the comment: ", saveErr);
        return res.status(500).send({ error: "Failed to save the comment" });
      });
  });
};
