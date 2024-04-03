import cors from "cors";
import express from "express";
import orderRouter from "./src/routes/orderRoute";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.options("*", cors());

app.use("/order", orderRouter);
app.get("/", (req, res) => {
  console.log("working....");
  return res.send("working");
});
app.listen(3005, () => {
  console.log("listening");
});
