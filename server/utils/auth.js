const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  // get token from req
  let token;
  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  // verify token
  try {
    const decode = jwt.verify(token, process.env.SECRET);
    res.locals.user = decode;
    next();
  } catch (error) {
    // console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};
