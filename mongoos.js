const express = require("express");
const monog = require("mongoose");
var cors = require('cors')
const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());




//Get all users from database mongoos
app.get("/users", async(req, res) => {
  let users = await usrModle.find();
    res.send(users);
});

//Post user to database mongoos
app.post("/users", async(req, res) => {
  let user = new usrModle(req.body);
  await user.save();
  res.json({msg: "user added", user});
});

//Patch user to database mongoos
app.patch("/users/:id", async(req, res) => {
  let user = await usrModle.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  res.json({ msg: "user updated", user });
});

//Delete user to database mongoos
app.delete("/users/:id", async(req, res) => {
  let user = await usrModle.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "user deleted", user });
});

//get user by id
app.get("/users/:id", async(req, res) => {
  let user = await usrModle.findOne({ _id: req.params.id });
  res.json({ msg: "user found", user });
});


//Get all products from database mongoos
app.get("/products", async(req, res) => {
  let products = await productModel.find();
  res.json({ msg: "products found", products });
});

//Post product to database mongoos
app.post("/products", async(req, res) => {
  let product = new productModel(req.body);
  await product.save();
  res.json({ msg: "product added", product });
});

//Patch product to database mongoos
app.patch("/products/:id", async(req, res) => {
  let product = await productModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  res.json({ msg: "product updated", product });
});

//Delete product to database mongoos
app.delete("/products/:id", async(req, res) => {
  let product = await productModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "product deleted", product });
});

//get product by id
app.get("/products/:id", async(req, res) => {
  let product = await productModel.findOne({ _id: req.params.id });
  res.json({ msg: "product found", product });
});

//Get all orders from database mongoos
app.get("/orders", async(req, res) => {
  let orders = await orderModel.find();
  res.json({ msg: "orders found", orders });
});

//Post order to database mongoos
app.post("/orders", async(req, res) => {
  let order = new orderModel(req.body);
  await order.save();
  res.json({ msg: "order added", order });
});

//Patch order to database mongoos
app.patch("/orders/:id", async(req, res) => {
  let order = await orderModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  res.json({ msg: "order updated", order });
});

//Delete order to database mongoos
app.delete("/orders/:id", async(req, res) => {
  let order = await orderModel.findOneAndDelete({ _id: req.params.id });
  res.json({ msg: "order deleted", order });
});

//get order by id
app.get("/orders/:id", async(req, res) => {
  let order = await orderModel.findOne({ _id: req.params.id });
  res.json({ msg: "order found", order });
});









const db =
  "mongodb+srv://curd:curd@cluster0.xusuyev.mongodb.net/?retryWrites=true&w=majority";
monog
  .connect(db)
  .then(function (chk) {
    // console.log(chk);
    console.log("DB connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userShema = monog.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  conpass: {
    type: String,
    required: true,
  },
});

const usrModle = monog.model("userModel", userShema);

//product schema
const productShema = monog.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const productModel = monog.model("productModel", productShema);


//create order schema by product id and user id
const orderShema = monog.Schema({
  product: {
    type: monog.Schema.Types.ObjectId,
    ref: "productModel",
  },
  user: {
    type: monog.Schema.Types.ObjectId,
    ref: "userModel",
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },

});

//create order model
const orderModel = monog.model("orderModel", orderShema);

//order
// (async function () {
//   let user = await usrModle.findOne({ email: "user2@test.com"
//   });
//   let product = await productModel.findOne({ name: "product1" });
//   let order = await orderModel.create({
//     product: product._id,
//     user: user._id,
//     address: "dhaka",
//     phone: 123456789,
//   });
//   console.log(order);
// }
// )();











//product 

// (async function prd() {
//   let pdd ={
//     name:"product1",
//     price:100,
//     description:"this is product1",
//     image : "123"
//   }
//   let prd = await productModel.create(pdd)
//   console.log(prd);
// }

// ())




// (async function crtUser() {
//   let usr = {
//     name: "user2",
//     email: "user2@test.com",
//     pass: "456",
//     conpass: "456",
//   };
//   let data = await usrModle.create(usr);
//   console.log(data);
// })();

// crtUser()



//COMMENTED CODE FOR REFERENCE
// let user = [
//   {
//     id: 1,
//     Name: "User1",
//   },
//   {
//     id: 2,
//     Name: "Use2",
//   },
//   {
//     id: 3,
//     Name: "User3",
//   },
//   {
//     id: 4,
//     Name: "User4",
//   },
// ];

// const userRouter = express.Router();
// app.use("/user", userRouter);
// userRouter
//   .route("/")
//   .get(getUser)
//   .post(dataPosted)
//   .patch(datapatched)
//   .delete(dataDelete);
// userRouter.route("/:id").get(getparams);

// //product router
// const productRouter = express.Router();
// app.use("/product", productRouter);
// productRouter
//  .route("/")
//   .get(getProduct)
//   .post(postProduct)
//   .patch(patchProduct)
//   .delete(deleteProduct);
// productRouter.route("/:id").get(getProductParams);


// //Order Router
// const orderRouter = express.Router();
// app.use("/order", orderRouter);
// orderRouter
//   .route("/")
//   .get(getOrder)
//   .post(postOrder)
//   .patch(patchOrder)
//   .delete(deleteOrder);
// orderRouter.route("/:id").get(getOrderParams);

// //ORDERS

// //get order function

// async function getOrder(req, res) {
//   let order = await orderModel.find();
//   res.json({msg:"Order",data:order});
// }

// //post order function

// async function postOrder(req, res) {
//   let order = req.body;
//   let newOrder = await orderModel.create(order);
//   res.json({msg:"Order",data:newOrder});
// }
// //patch order
// async function patchOrder(req, res) {
//   let order = req.body;
//   let updataOrder = await orderModel.findByIdAndUpdate(order._id, order);
//   res.json({msg:"Order",data:updataOrder});
// }

// //delete order
// async function deleteOrder(req, res) {
//   let order = req.body;
//   let deleteOrder = await orderModel.findByIdAndDelete(order._id);
//   res.json({msg:"Order",data:deleteOrder});
// }

// //get order params
// function getOrderParams(req, res) {
//   console.log(req.params.id);
//   let paramsID = req.params.id;
//   let obj = {};
//   for (let i = 0; i < user.length; i++) {
//     if (user[i]["id"] == paramsID) {
//       obj = user[i];
//       console.log(i);
//     }
//   }
//   res.json({
//     msg: "req parans loged",
//     data: obj,
//   });

// }


// //PRODUCTS



// //get product function
// async function getProduct(req, res) {
//   let product = await productModel.find();
//   res.json({msg:"get product",product});
// }

// //post product
// async function postProduct(req, res) {
//   let product = req.body;
//   let newProduct = await productModel.create(product);
//   res.json({msg:"post product",newProduct});
// }

// //patch product
// async function patchProduct(req, res) {
//   let updateproduct = req.body;
//   let product = await productModel.findByIdAndUpdate(
//     updateproduct._id,
//     updateproduct
//   );
//   res.json({ msg: "patch product", product });

// }

// //delete product
// async function deleteProduct(req, res) {
//   let deleteproduct = req.body;
//   let product = await productModel.findByIdAndDelete(deleteproduct._id);
//   res.json({ msg: "delete product", product });
// }


// //get product params
// function getProductParams(req, res) {
//   let id = req.params.id;
//   let product = productModel.find({ _id: id });
//   res.json({ msg: "get product params", product });
// }


// //USERS

// //get User function
// async function getUser(req, res) {
//   let users = await usrModle.find();
//   res.json({ msg: "use list get", data: users });
// }

// //patch function

// async function datapatched(req, res) {

//   console.log(req.body);
//   let updata = req.body;
//   let userpatch = await usrModle.findByIdAndUpdate(updata._id, updata);
// //   for (key in updata) {
// //     user[key] = updata[key];
// //   }

//   res.json({
//     msg: "data patched",
//     data:userpatch
//   });
// }

// //get post

// async function dataPosted(req, res) {
// //   console.log(req.body);
// let dataOBJ = req.body
// let datapost =await usrModle.create(dataOBJ)
// console.log(datapost);
//   res.json({
//     msg: "data posted",
//     user: datapost,
//   });
// }

// //get deletedd data

// async function dataDelete(req, res) {
//     let del = req.body
//  let userdel = await usrModle.findOneAndDelete(del)
//   res.json({
//     msg: "delted",
//     data: userdel
//   });
// }

// //get params
// function getparams(req, res) {
//   console.log(req.params.id);
//   let paramsID = req.params.id;
//   let obj = {};
//   for (let i = 0; i < user.length; i++) {
//     if (user[i]["id"] == paramsID) {
//       obj = user[i];
//       console.log(i);
//     }
//   }
//   res.json({
//     msg: "req parans loged",
//     data: obj,
//   });
// }