import morgan from "morgan";
import express, { Request, Response, response } from "express";
import { request } from "http";
import Joi from "joi";

const app = express();
const port = 3000;

const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

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
  .get("/api/planets/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    const planet = planets.find((el) => el.id === Number(id));
    response.status(200).json(planet);
  })
  .post("/api/planets", (request: Request, response: Response) => {
    const { id, name } = request.body;
    const newPlanet: Planet = { id, name };

    const validateNewPlanet = planetSchema.validate(newPlanet);

    if (validateNewPlanet.error) {
      return response.status(400).json({
        message: validateNewPlanet.error.details[0].message,
      });
    } else {
      planets = [...planets, newPlanet];
      response.status(201).json({ message: "The planet was created" });
    }
  })
  .put("/api/planets/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    const { name } = request.body;
    planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

    response.status(200).json({ message: "The planet was updated" });
  })
  .delete("/api/planets/:id", (request: Request, response: Response) => {
    const { id } = request.params;
    planets = planets.filter((p) => p.id !== Number(id));

    response.status(200).json({ message: "The planet was deleted" });
  })
  .listen(port, () => {
    console.log(`Server listening at https://localhost:${port}`);
  });
