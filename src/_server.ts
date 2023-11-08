import morgan from "morgan";
import express, { Request, Response, response } from "express";
import { request } from "http";
import Joi from "joi";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
} from "./controllers/planets";

const app = express();
const port = 3000;

app
  .use(morgan("dev"))
  .use(express.json())
  .get("/api/planets", getAll)
  .get("/api/planets/:id", getOneById)
  .post("/api/planets", create)
  .put("/api/planets/:id", updateById)
  .delete("/api/planets/:id", deleteById)
  .listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });
