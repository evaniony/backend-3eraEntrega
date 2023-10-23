import  express  from "express";
export const routerProducts = express.Router();
import { getAllProducts, getProdById, renderProducts } from "../controller/product.controller.js";
import { checkUser } from "../middlewares/auth.js";

//todos los productos;
//routerProducts.get("/", getAllProducts);

//producto por id;
//routerProducts.get("/:id", getProdById);
routerProducts.get("/", checkUser, renderProducts);
