const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const pool = require("./db/db");
const cors = require("cors");

const port = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080",
  })
);
app.get("/", (_, res) => res.send("Hello World!"));
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

app.listen(port, () => {
  pool
    .connect()
    .then(() => console.log("db connect"))
    .catch((err) => console.log(err));
  console.log(`server is listening on PORT : ${port}`);
});
