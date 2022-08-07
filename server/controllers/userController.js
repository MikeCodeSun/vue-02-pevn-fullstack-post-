const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db/db");
require("dotenv").config();

const getUsers = async (_, res) => {
  try {
    const data = await pool.query("SELECT * FROM users");
    const users = data.rows;
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

const register = async (req, res) => {
  const { name, password } = req.body;
  const errors = {};
  try {
    // handle req body input error message
    if (!name || name.trim() === "") errors.name = "Name must not be empty!";
    if (!password) errors.password = "Password must not be empty";
    if ([...password].length < 6) errors.password = "Password must more than 6";
    if (Object.keys(errors).length > 0) {
      throw errors;
    }
    //  check user name is already registered
    const data = await pool.query("SELECT * FROM users Where name = $1", [
      name,
    ]);

    if (data.rows.length > 0) {
      errors.name = "Name already registered, please change another one!";
      throw errors;
    }
    // hash password
    const hashPasswrod = await bcrypt.hash(password, 6);
    // insert into database
    const newData = await pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *",
      [name, hashPasswrod]
    );
    //
    res.status(200).json(newData.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(503).json(errors);
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;
  const errors = {};
  try {
    // handle req body input error message
    if (!name || name.trim() === "") errors.name = "Name must not be empty!";
    if (!password) errors.password = "Password must not be empty";
    if (Object.keys(errors).length > 0) {
      throw errors;
    }
    // check name is register in db
    const data = await pool.query("SELECT * FROM users Where name = $1", [
      name,
    ]);

    if (data.rows.length < 1) {
      errors.name = "Name not register, please register!";
      throw errors;
    }
    // compare password
    const valid = await bcrypt.compare(password, data.rows[0].password);
    if (!valid) {
      errors.password = "Password not right";
      throw errors;
    }
    // generate jwt token
    const token = jwt.sign({ name }, process.env.SECRET, { expiresIn: "1d" });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json(errors);
  }
};

module.exports = { getUsers, register, login };
