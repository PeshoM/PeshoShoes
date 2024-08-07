import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import registerRouter from "./routers/authentication/register.router";
import loginRouter from "./routers/authentication/login.router";
import productsRouter from "./routers/products.router";
import roleRouter from "./routers/role.router";
import searchInputRouter from "./routers/searchInput.router";
import filteredDataRouter from "./routers/filteredData.router";
import fetchProductRouter from "./routers/fetchProduct.router";
import getRegisteredUserRouter from "./routers/getRegisteredUser.router";
import fetchParamsDataRouter from "./routers/fetchParamsData.router";
import clickedNavigationUrlRouter from "./routers/clickedNavigationUrl.router";
import checkoutRouter from "./routers/checkout.router";
import fetchParamsProductsRouter from "./routers/fetchParamsProducts.router";
import forgottenPasswordRouter from "./routers/authentication/forgottenPassword.router";
import passwordResetRouter from "./routers/passwordReset.router";
import bodyParser from "body-parser";
import env from "dotenv";
import { matchPrices, matchField } from "./utils/filter.utils";
import { Product } from "./schemas/products.schema";
const server = express();

env.config();

// (async () => {
//   console.log("server-side log",
//     JSON.stringify(
//       await Product.aggregate(
//         matchField([], {
//           field: "season",
//           value: "spring"
//         })
//       ).exec()
//     )
//   );
// })();

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
server.use(getRegisteredUserRouter);
server.use(fetchParamsDataRouter);
server.use(clickedNavigationUrlRouter);
server.use(checkoutRouter);
server.use(fetchParamsProductsRouter);
server.use(forgottenPasswordRouter);
server.use(passwordResetRouter);

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
