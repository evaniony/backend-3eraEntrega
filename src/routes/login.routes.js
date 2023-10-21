import express from "express";
import { users } from "../DAO/dao/users.dao.js";
import { createHash, isValidPassword } from "../utils/passwords.js";
import { loginController } from "../controller/login.controller.js";
import { userController } from "../controller/users.controller.js";
import { userService } from "../services/users.service.js";
export const loginRouter = express.Router();

loginRouter.post("/register", async (req, res) =>{
    const { firstName, lastName, email, age, password } = req.body;

    if(!firstName || !lastName || !email || !age || !password){
        return res.status(400).render(
        "error-page",
        {msg: "Hubo un error al ingresar."}
        );
    };
    
    try{
        await userService.createUser(firstName, lastName, email, age, password);
        req.session.firstName = firstName;
        req.session.email = email;
        return res.redirect("/products")
        
        }catch(e){
        return res.status(401).render(
        "error-page",
        {msg: "Hubo un error! try again."}
        );
    }
});

//aqui va la logica del login
loginRouter.post("/login", async (req, res) =>{
    try{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(401).render(
        "error-page",
         {msg: "Error: faltan datos;"}
         );
    }

    const foundUser = await users.getOne(email);
        if(foundUser && isValidPassword(password, foundUser.password)){
            req.session.firstName = foundUser.firstName;
            req.session.email = foundUser.email;
            return res.redirect("/products");
        }else{
            return res.status(400).render(
                "error-page",
                {msg: "El email o password esta incorrecto."}
                );  
        };
    
    }catch(e){
    return res.status(400).render(
    "error-page",
    {msg: "Espera, ocurrio un error."}
    );
    }
});


   