const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

//Get POST
router.get("/", async (req, res) => {
  const post = await ConnectDB();
  res.status(200).send(await post.find({}).toArray());
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

//Delete post
router.delete("/:id", async (req, res) => {
  const post = await ConnectDB();
  await post.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.status(200).send("Deleted Post!");
});

const ConnectDB = async () => {
  const client = await mongodb.MongoClient.connect(
    "mongodb+srv://samwilk18:Nikeair18!@vue-todo.evdlr.mongodb.net/Vue-todo?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  );
  return client.db("vue-todo").collection("posts");
};

module.exports = router;
