const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 5000;
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

const posts = require("./routes/api/posts");

//GET
app.use("/api/posts", posts);

//Running port
app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
