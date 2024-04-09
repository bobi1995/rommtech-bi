import express from "express";
import mssql from "mssql";
import localDB from "../../db/db";
import { getOrderQuantities } from "../queries/orders";

const orderRouter = express.Router();

orderRouter.get("/quantities", async (req, res) => {
  if (req.query.order) {
    try {
      const pool = await mssql.connect(localDB);
      const orderQuery = getOrderQuantities(req.query.order?.toString());
      const result = await pool.query(orderQuery);

      await pool.close();

      return res.send(result.recordsets);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
});

export default orderRouter;
