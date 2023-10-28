import morgan from "morgan";
import express, { Request, Response } from "express";

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
  .get("/api/planets", (request: Request, response: Response) => {
    response.status(200).json(planets);
  })
  .listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });
