import express from "express";
const server = express();
import mongoose from "mongoose";
const cors = require("cors");
const registerRouter = require("./routers/authentication/register.router");
const loginRouter = require("./routers/authentication/login.router");
const productsRouter = require("./routers/products.router");
const roleRouter = require("./routers/role.router");
const searchInputRouter = require("./routers/searchInput.router");
const filteredDataRouter = require("./routers/filteredData.router");
const fetchProductRouter = require("./routers/fetchProduct.router");
const bodyParser = require("body-parser");

import env from "dotenv";
env.config();

// server.use(bodyParser.json()); // get the body in the request
server.use(express.json());
server.use(cors({ origin: "*" })); // Policy -> Secure Policy which specifies our client, so others can't send requests ( DDOS )
server.use(bodyParser.urlencoded({ extended: true }));

server.use(registerRouter);
server.use(loginRouter);
server.use(productsRouter);
server.use(roleRouter);
server.use(searchInputRouter);
server.use(filteredDataRouter);
server.use(fetchProductRouter);

server.use("/uploads", express.static("uploads"));
process.env.DATABASE_CONNECTION &&
  mongoose.connect(process.env.DATABASE_CONNECTION);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  ("Connected successfully");
});

server.listen(process.env.PORT, () => {
  console.log("Server is  on", process.env.PORT);
});
