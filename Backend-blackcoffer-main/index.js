// http://localhost:81/data?query={} query*****

const express = require("express");
// const { MongoClient, CURSOR_FLAGS } = require("mongodb");
const mongoose = require("mongoose");

// Replace the uri string with your connection string.
mongoose.connect(
  "mongodb+srv://Blackcoffer:Black2010@dashboard.gm2mtrv.mongodb.net/Blackcoffer?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Initialize app
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser"); //parser compiller ,spilit program for unders..

app.use(bodyParser.json());
app.use(cors());

const User = require("./User");
app.get("/query", async function (req, res) {
  try {
    const filters = req.body;
    console.log(filters);
    let userData = await User.find().exec();

    userData.sort((a, b) => {
      a = new Date(a.added);
      b = new Date(b.added);
      if (a.getTime() > b.getTime()) {
        return 1;
      } else {
        return -1;
      }
    });

    res.send(userData);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

// Start server with port 3000
app.listen(81, function () {
  console.log("Server started on localhost:81");
});
