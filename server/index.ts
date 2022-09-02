import { Request, Response } from "express";
import { Client } from "pg";

const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client: Client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.log("PG ERROR", err));
});

//Express routes
app.get("/", (req: Request, res: Response) => {
  res.send("Backend server for K8 deploy testing");
});

// get all the values
app.get("/values/all", async (req: Request, res: Response) => {
  const values = await pgClient.query("SELECT * FROM values");

  res.send(values);
});

// add value
app.post("/values", async (req: Request, res: Response) => {
  if (!req.body.value) res.send({ working: false });

  pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]);

  res.send({ working: true });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
