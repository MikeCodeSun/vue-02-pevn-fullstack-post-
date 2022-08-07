const router = require("express").Router();
const { getUsers, register, login } = require("../controllers/userController");
const auth = require("../utils/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/users").get(auth, getUsers);

module.exports = router;
