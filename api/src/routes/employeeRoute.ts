import express from "express";
import mssql from "mssql";
import localDB from "../../db/db";
import {
  getAllEmployees,
  getAverageItemTime,
  getEmployeeProduction,
} from "../queries/employees";
import { verify } from "../helper/verify";

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

empRoute.get("/all", async (req, res) => {
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

empRoute.get("/items", async (req, res) => {
  try {
    const pool = await mssql.connect(localDB);
    const query = getEmployeeProduction(req.query.empId?.toString());
    const result = await pool.query(query);

    await pool.close();

    return res.send(result.recordsets);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export default empRoute;
