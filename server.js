process.on("uncaughtException", (err) => {
  console.log("error", err);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnection } from "./databases/dbConnection.js";

const app = express();
const port = 3000;

dotenv.config();


import { bootstrap } from "./src/index.routes.js";
import { createOnlineOrder } from "./src/modules/order/orderController.js";

dbConnection();

app.use(cors());
app.post('/webhooks', express.raw({type: 'application/json'}),createOnlineOrder);
app.use(express.json());

app.get("/", (req, res, next) => {
  res.json({ msg: "hello world" });
});
bootstrap(app);



  
process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
