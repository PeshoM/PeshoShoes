import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import registerRouter from "./routers/authentication/register.router";
import loginRouter from "./routers/authentication/login.router";
import productsRouter from "./routers/products.router";
import roleRouter from "./routers/role.router";
import searchInputRouter from "./routers/searchInput.router";
import filteredDataRouter from "./routers/filteredData.router";
import fetchProductRouter from "./routers/fetchProduct.router";
import bodyParser from 'body-parser';
const server = express();

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
