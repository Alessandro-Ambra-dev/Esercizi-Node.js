import "dotenv/config";
import { Request, Response } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken";

const logIn = async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const user = await db.one(`SELECT * FROM users WHERE username=$1`, username);

  if (user && user.password === password) {
    const payload = {
      id: user.id,
      username,
    };
    const { SECRET = "" } = process.env;
    const token = jwt.sign(payload, SECRET);
    console.log(token);
    await db.none(`UPDATE users SET token=$2 WHERE id=$1 `, [user.id, token]);
    response.status(200).json({ id: user.id, username, token });
  } else {
    response.status(400).json({ message: "Username or Password incorrect" });
  }
};

const signUp = async (request: Request, response: Response) => {
  const { username, password } = request.body;
  const user = await db.oneOrNone(
    `SELECT * FROM users WHERE username=$1`,
    username
  );
  if (user) {
    response.status(400).json({ message: "User already exists" });
  } else {
    const { id } = await db.one(
      `INSERT INTO users (username,password) VALUES ($1,$2) RETURNING id `,
      [username, password]
    );
    response
      .status(201)
      .json({ id, message: "Signup successful. Now you can log in." });
  }
};

const logOut = async (request: Request, response: Response) => {
  const user: any = request.user;
  await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null]);
  response.status(200).json({ message: "Logout successfully accomplished" });
};

export { logIn, signUp, logOut };
