const express = require("express");

const postController = require("../controllers/posts");
const commentController = require("../controllers/comment");
const { verify } = require("../auth");

const router = express.Router();

// Posts
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPost);
router.post("/", verify, postController.addPost);
router.put("/:id", verify, postController.updatePost);
router.delete("/:id", verify, postController.deletePost);

// Comments
router.get("/:id/comment", commentController.getComments);
router.post("/:id/comment", verify, commentController.addComment);

module.exports = router;
