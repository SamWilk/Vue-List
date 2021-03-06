const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

//Get POST
router.get("/", async (req, res) => {
  const post = await ConnectDB();
  const data = await post.find({}).toArray();
  console.log("Posts: ", data);
  res.status(200).send(data);
});

//Post posts
router.post("/", async (req, res) => {
  const post = await ConnectDB();
  await post.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send("Created Post!");
});

//Update Post
router.put("/:id", async (req, res) => {
  const post = await ConnectDB();
  const data = await post.find({ _id: req.params.id });
  console.log("Updating Post", data);
});

//Delete post
router.delete("/:id", async (req, res) => {
  const post = await ConnectDB();
  await post.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.status(200).send("Deleted Post!");
});

const ConnectDB = async () => {
  const client = await mongodb.MongoClient.connect(process.env.MONGODBMURL, {
    useNewUrlParser: true,
  });
  return client.db("vue-todo").collection("posts");
};

module.exports = router;
