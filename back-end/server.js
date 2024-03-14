const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const products = require("./schemas/products.schema");
const users = require("./schemas/users.schema");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const registerRouter = require("./routers/authentication/register.router");
const loginRouter = require("./routers/authentication/login.router");
const productsRouter = require("./routers/products.router");
const roleRouter = require("./routers/role.router");
const searchInputRouter = require("./routers/searchInput.router");
const filteredDataRouter = require("./routers/filteredData.router");

server.use(express.json()); // get the body in the request
server.use(cors({ origin: "*" })); // Policy -> Secure Policy which specifies our client, so others can't send requests ( DDOS )
server.use(express.urlencoded());

server.use("/uploads", express.static("uploads"));

server.use(registerRouter);
server.use(loginRouter);
server.use(productsRouter);
server.use(roleRouter);
server.use(searchInputRouter);
server.use(filteredDataRouter);

mongoose.connect("mongodb://localhost:27017/PeshoShoes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  ("Connected successfully");
});


// server.post("/role", handleAdminReq, async (req, res) => {
//   let role = req.role;
//   let tokenData = { role };
//   res.json(tokenData);
// });

// server.post("/products", upload.single("product"), async (req, res) => {
//   console.log("there", req.body.data);
//   console.log("file", req.file);
//   const product = new products({
//     title: req.body.title,
//     description: req.body.description,
//     image: req.file.path,
//     price: req.body.price,
//   });
//   await product.save();

//   res.json({ message: "success" });
// });

// server.post("/result", async (req, res) => {
//   ("i got here");
//   req.body.results;
// });

server.listen(8000, () => {
  ("Server is  on");
});
