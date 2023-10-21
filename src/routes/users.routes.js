import express from "express";
export const usersRouter = express.Router();
import { userController } from "../controller/users.controller.js";
import { checkUser } from "../middlewares/auth.js";

//usersRouter.get("/", userController.getAllUsers);
//usersRouter.post("/", userController.registerUser);
usersRouter.get("/", userController.renderUser);