const pool = require("../db/db");

const createPost = async (req, res) => {
  const { title, body } = req.body;
  const user = res.locals.user;
  const errors = {};
  console.log(user);
  try {
    // check user input
    if (!title || title.trim() === "") errors.title = "Title must not be empty";
    if (!body || body.trim() === "") errors.body = "Body must not be empty";
    if (Object.keys(errors).length > 0) throw errors;
    // insert into database
    const postData = await pool.query(
      "INSERT INTO posts (title, body, username) VALUES($1, $2, $3) RETURNING *",
      [title, body, user.name]
    );
    //
    res.status(200).json({ post: postData.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(400).json(errors);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const user = res.locals.user;
  // console.log(id, user);
  const errors = {};
  try {
    // find post from querry id
    const postData = await pool.query("SELECT * FROM posts WHERE id=$1", [id]);
    if (postData.rows.length === 0) {
      errors.post = "Post not exist";
      throw errors;
    }
    // check post by user
    if (postData.rows[0].username !== user.name) {
      errors.post = "User have not auth to delete post";
      throw errors;
    }
    // delete post
    const deletePost = await pool.query(
      "DELETE FROM posts WHERE id=$1 RETURNING *",
      [id]
    );
    console.log(deletePost);

    res.status(200).json({ msg: "Post delteted!" });
  } catch (error) {
    console.log(error);
    res.status(400).json(errors);
  }
};

const getOnePost = async (req, res) => {
  const { id } = req.params;
  const errors = {};
  try {
    const postData = await pool.query("SELECT * FROM posts WHERE id=$1", [id]);
    if (postData.rows.length === 0) {
      errors.post = "Post not exist";
      throw errors;
    }
    res.status(200).json({ post: postData.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const postData = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.status(200).json(postData.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const updatePost = async (req, res) => {
  const { id } = req.params;
  const user = res.locals.user;
  let { title, body } = req.body;

  const errors = {};
  try {
    // check user input
    if (!title || title.trim() === "") errors.title = "Title must not be empty";
    if (!body || body.trim() === "") errors.body = "Body must not be empty";
    if (Object.keys(errors).length > 0) throw errors;
    // find the update post
    const postData = await pool.query("SELECT * FROM posts WHERE id=$1", [id]);
    if (postData.rows.length === 0) {
      errors.post = "Post not exist";
      throw errors;
    }
    // check post is posted by user
    if (postData.rows[0].username !== user.name) {
      errors.post = "Post not allowed to edit";
      throw errors;
    }
    // update post

    const newData = await pool.query(
      "UPDATE posts SET title=$1, body=$2 WHERE id=$3 RETURNING *",
      [title, body, id]
    );

    res.status(200).json({ post: newData.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  deletePost,
  updatePost,
};
