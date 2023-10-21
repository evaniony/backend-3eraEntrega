import express from "express";
export const routerCart = express.Router();
import { addProduct, allCarts, cartById, deleteCart, deleteProdQuantity, deleteProdToCart, getRender, putCartQty, updateCart } from "../controller/cart.controller.js";
import { ticketController } from "../controller/ticket.controller.js";

routerCart.get("/", allCarts);
//buscar carrito
routerCart.get("/:cid", cartById);
routerCart.get("/:cid", getRender);

//agregar producto
routerCart.post("/:cid/products/:pid", addProduct);

//elegir carrito, de su lista de productos, borrar determinado producto;
routerCart.delete("/:cid/products/:pid", deleteProdToCart);

//actualizar producto desde el req.params;
routerCart.put("/:cid", updateCart);

//actualiza cantidades del producto;
routerCart.put("/:cid/products/:pid", putCartQty);

//REVISAR
routerCart.delete("/:cid/products/:pid", deleteProdQuantity);

//borra todos los productos del carrito, sin eliminar el array;
routerCart.delete("/:cid", deleteCart);



//ticket
routerCart.post("/:cid/purchase", ticketController.create);




 