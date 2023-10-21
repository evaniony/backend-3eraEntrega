import express from "express";
import { getAllProducts } from "../controller/product.controller.js";
import { checkUser } from "../middlewares/auth.js";
//import { auth } from "../middlewares/auth.js";
//import passport from "passport";

export const viewsRouter = express.Router();

viewsRouter.get("/login", async (req, res) => {
    res.render("login");
});

viewsRouter.get("/register", async (req, res) => {
    res.render("register");
});

viewsRouter.get("/products", checkUser, async (req, res) => {
    res.render("products");
});

viewsRouter.get("/user", async (req, res) => {
    res.render("users");
});

viewsRouter.get("/cart", async (req, res) => {
    res.render("carts");
});

viewsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.render("error-page");
      }
      return res.redirect("/login");
    })
   });