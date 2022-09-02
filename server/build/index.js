"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
pgClient.on("connect", (client) => {
    client
        .query("CREATE TABLE IF NOT EXISTS values (number INT)")
        .catch((err) => console.log("PG ERROR", err));
});
//Express route definitions
app.get("/", (req, res) => {
    res.send("Hi");
});
// get the values
app.get("/values/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const values = yield pgClient.query("SELECT * FROM values");
    res.send(values);
}));
// now the post -> insert value
app.post("/values", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.value)
        res.send({ working: false });
    pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]);
    res.send({ working: true });
}));
app.listen(5000, () => {
    console.log("Listening on port 5000");
});
