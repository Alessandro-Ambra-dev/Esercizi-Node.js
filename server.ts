import morgan from "morgan";
import express, { request, response } from "express";
import "express-async-errors";


const app = express();

const port = 3000;

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];

app
  .use(morgan("dev"))
  .use(express.json())
  .get("/api/planets", (request, response) => {
    response.status(200).json(planets);
  })
  .listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });
