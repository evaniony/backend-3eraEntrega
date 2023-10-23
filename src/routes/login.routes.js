import express from "express";;
import { loginController } from "../controller/login.controller.js";

export const loginRouter = express.Router();

loginRouter.post("/register", loginController.registerUser);

//aqui va la logica del login
loginRouter.post("/login", loginController.loginUser);


   