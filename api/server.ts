import cors from "cors";
import express from "express";
import orderRouter from "./src/routes/orderRoute";
import itemRouter from "./src/routes/itemRoute";
import empRoute from "./src/routes/employeeRoute";
import authRoute from "./src/routes/auth";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.options("*", cors());

app.use("/order", orderRouter);
app.use("/item", itemRouter);
app.use("/emp", empRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  console.log("working....");
  return res.send("working");
});
app.listen(3005, () => {
  console.log("listening");
});
