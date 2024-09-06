import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/users";

type SignUpBody = {
  username: string;
  email: string;
  password: string;
};

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
  console.log("yooooooo");
  console.log(req.body);
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      console.log("username: " + username + "\n" + "email: " + email + "\n" + "password: " + passwordRaw);

      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await UserModel.findOne({ username: username }).exec();
    if (existingUsername) {
      throw createHttpError(409, "Username already taken. Please choose a diferent one or log in instead.");
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, "A user with this email address already exists. Please log in instead.");
    }

    const passwordMathRand = Math.floor(Math.random() * passwordRaw.length * 1000);

    console.log(passwordMathRand);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordMathRand,
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};
