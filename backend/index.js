import dotenv from "dotenv";
import cors from "cors";
import express, { json, urlencoded } from "express";
import {routes} from "./api/route.js";

dotenv.config({ path: "./config.env" });
const app = express();
const port = 5000;
app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(routes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
