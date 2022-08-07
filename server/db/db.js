const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
});

module.exports = pool;
