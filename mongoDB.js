const express = require("express");
// mongo db
const { MongoClient, ObjectId } = require("mongodb");
var cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Connection URL
const url =
  "mongodb+srv://ecom:ecom@cluster0.fzignuy.mongodb.net/?retryWrites=true&w=majority";
// Database Name
const dbName = "ecom";
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the Server
client.connect(function (err) {
  console.log("Connected successfully to Server");
  const db = client.db(dbName);
  const collection = db.collection("products");
  const users = db.collection("users");
  const orders = db.collection("orders");
  return collection, users, orders;
});

// get all products
app.get("/products", (req, res) => {
  const collection = client.db(dbName).collection("products");
  collection.find({}).toArray(function (err, docs) {
    res.send(docs);
  });
});

//post product
app.post("/products", (req, res) => {
  const collection = client.db(dbName).collection("products");
  collection.insertOne(req.body, function (err, result) {
    res.send(result);
  });
});

//patch product
app.patch("/products/:id", (req, res) => {
  const collection = client.db(dbName).collection("products");
  collection.findOneAndUpdate(

    { _id: ObjectId(req.params.id) },
    { $set: req.body },
    function (err, result) {
        res.send(result);
        }
    );
});

//delete product
app.delete("/products/:id", (req, res) => {
  const collection = client.db(dbName).collection("products");
  const  id  = req.params;
  collection.findOneAndDelete({ _id: ObjectId(id) }, function (err, result) {
    console.log(result);
        res.send(result);
  });
});

//get product by id
app.get("/products/:id", (req, res) => {
    const collection = client.db(dbName).collection("products");
    const  id  = req.params;
    console.log(id);
    console.log(req.params.id)
    collection.findOne({ _id: ObjectId(id) }, function (err, result) {
    console.log(result);
        res.send(result);
    }
    );

});



//User get
app.get("/users", (req, res) => {
  const collection = client.db(dbName).collection("users");
  collection.find({}).toArray(function (err, docs) {
    res.send(docs);
  });
});

//User post
app.post("/users", (req, res) => {
  const collection = client.db(dbName).collection("users");
  collection.insertOne(req.body, function (err, result) {
    res.send(result);
  });
});

//User patch
app.patch("/users/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  const collection = client.db(dbName).collection("users");
  collection.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: req.body },
    function (err, result) {
        res.send(result);
        }
    );
});

//User delete by id prams

app.delete("/users/:id", (req, res) => {
  const collection = client.db(dbName).collection("users");
  const  id  = req.params;
  collection.findOneAndDelete({ _id: ObjectId(id) }, function (err, result) {
    console.log(result);
        res.send(result);
  });
});

//find user by id if the user found in the database then return the user
app.get("/users/:id", (req, res) => {
    const collection = client.db(dbName).collection("users");
    const  id  = req.params;
    console.log(id);
    console.log(req.params.id)
    collection.findOne({ _id: ObjectId(id) }, function (err, result) {
    console.log(result);
        res.send(result);
    }
    );
})




//Order get
app.get("/orders", (req, res) => {
  const collection = client.db(dbName).collection("orders");
  collection.find({}).toArray(function (err, docs) {
    res.send(docs);
  });
});

//Order post
app.post("/orders", (req, res) => {
  const collection = client.db(dbName).collection("orders");
  collection.insertOne(req.body, function (err, result) {
    res.send(result);
  });
});

//Order patch
app.patch("/orders/:id", (req, res) => {
  const collection = client.db(dbName).collection("orders");
  collection.findOneAndUpdate(
    { _id: ObjectId(req.params.id) },
    { $set: req.body },
    function (err, result) {
        res.send(result);
        }
    );
});

//Order delete
app.delete("/orders/:id", (req, res) => {
  const collection = client.db(dbName).collection("orders");
  const  id  = req.params;
  collection.findOneAndDelete({ _id: ObjectId(id) }, function (err, result) {
    console.log(result);
        res.send(result);
  });
});

//find order by Id
app.get("/orders/:id", (req, res) => {
    const collection = client.db(dbName).collection("orders");
    const  id  = req.params;

    console.log(req.params.id)
    collection.findOne({ _id: ObjectId(id) }, function (err, result) {
    console.log(result);
        res.send(result);
    }
    );
})
