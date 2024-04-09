import express from "express";
import mssql from "mssql";
import localDB from "../../db/db";
import { getItemById } from "../queries/item";

const itemRoute = express.Router();

itemRoute.get("/", async (req, res) => {
  if (req.query.item) {
    try {
      const pool = await mssql.connect(localDB);
      const query = getItemById(req.query.item?.toString());
      const result = await pool.query(query);

      await pool.close();

      return res.send(result.recordsets);
    } catch (err) {
      console.log(err);
      throw err;
    }
  } else res.send([]);
});

export default itemRoute;
