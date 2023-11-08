import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/es-node");
const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
  );`);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
};

setupDb();

const getAll = async (request: Request, response: Response) => {
  const planets = await db.many(`SELECT * FROM planets`);
  response.status(200).json(planets);
};

const getOneById = async (request: Request, response: Response) => {
  const { id } = request.params;
  const planet = await db.oneOrNone(
    `SELECT * FROM planets WHERE id=$1`,
    Number(id)
  );
  response.status(200).json(planet);
};

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

const create = async (request: Request, response: Response) => {
  const { name } = request.body;
  const newPlanet = { name };

  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    return response.status(400).json({
      message: validateNewPlanet.error.details[0].message,
    });
  } else {
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
    response.status(201).json({ message: "The planet was created" });
  }
};

const updateById = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { name } = request.body;

  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);

  response.status(200).json({ message: "The planet was updated" });
};

const deleteById = async (request: Request, response: Response) => {
  const { id } = request.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));

  response.status(200).json({ message: "The planet was deleted" });
};

const createImage = async (request: Request, response: Response) => {
  const { id } = request.params;
  const fileName = request.file?.path;
  if (fileName) {
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, fileName]);
    response
      .status(201)
      .json({ message: "Planet image uploaded successfully" });
  } else {
    response.status(400).json({ message: "Planet image failed to upload" });
  }
};

export { getAll, getOneById, create, updateById, deleteById, createImage };
