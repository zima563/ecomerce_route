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
import { apiError } from "./src/utils/apiError.js";

app.use(cors());
app.use(express.json());
app.use("/", express.static("uploads"));

dbConnection();
bootstrap(app);

// app.use("/", (req, res, next) => {
//   res.json({ msg: "hello world" });
// });

app.use("*", (req, res, next) => {
  next(new apiError(`not found endPoint : ${req.originalUrl}`, 404));
});

process.on("unhandledRejection", (err) => {
  console.log("error", err);
});
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
