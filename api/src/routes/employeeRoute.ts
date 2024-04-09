import express from "express";
import mssql from "mssql";
import localDB from "../../db/db";
import { getAllEmployees, getAverageItemTime } from "../queries/employees";

const empRoute = express.Router();

empRoute.get("/", async (req, res) => {
  if (req.query.empId) {
    try {
      const pool = await mssql.connect(localDB);
      const query = getAverageItemTime(req.query.empId?.toString());
      const result = await pool.query(query);

      await pool.close();

      return res.send(result.recordsets);
    } catch (err) {
      console.log(err);
      throw err;
    }
  } else res.send([]);
});

empRoute.get("/emp", async (req, res) => {
  try {
    const pool = await mssql.connect(localDB);
    const query = getAllEmployees();
    const result = await pool.query(query);

    await pool.close();

    return res.send(result.recordsets);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export default empRoute;
