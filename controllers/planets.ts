import { Request, Response } from "express";
import Joi from "joi";

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

const getAll = (request: Request, response: Response) => {
  response.status(200).json(planets);
};

const getOneById = (request: Request, response: Response) => {
  const { id } = request.params;
  const planet = planets.find((el) => el.id === Number(id));
  response.status(200).json(planet);
};

const create = (request: Request, response: Response) => {
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
};

const updateById = (request: Request, response: Response) => {
  const { id } = request.params;
  const { name } = request.body;
  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  response.status(200).json({ message: "The planet was updated" });
};

const deleteById = (request: Request, response: Response) => {
  const { id } = request.params;
  planets = planets.filter((p) => p.id !== Number(id));

  response.status(200).json({ message: "The planet was deleted" });
};

export { getAll, getOneById, create, updateById, deleteById };
