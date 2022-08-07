const {
  getOnePost,
  deletePost,
  updatePost,
  getAllPosts,
  createPost,
} = require("../controllers/postController");
const auth = require("../utils/auth");

const router = require("express").Router();

router.route("/").get(getAllPosts).post(auth, createPost);
router
  .route("/:id")
  .get(getOnePost)
  .delete(auth, deletePost)
  .patch(auth, updatePost);

module.exports = router;
