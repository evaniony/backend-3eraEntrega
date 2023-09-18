import  express  from "express";
export const routerProducts = express.Router();
import { getAllProducts } from "../controller/product.controller.js";

//todos los productos;
routerProducts.get("/", getAllProducts);
