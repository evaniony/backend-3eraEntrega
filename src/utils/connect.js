import { connect } from "mongoose";
import { productModel } from "../DAO/models/product.model.js";
import { cartModel } from "../DAO/models/cart.model.js";
import { env } from "./config.js";
export async function connectMongo() {
  try {
    await connect(env.mongoUrl);
    logger.info("Conexión exitosa a la base de datos.");
  } catch (e) {
    logger.error("Falló la conexión a la base de datos.");
    throw "Falló la conexion";
  }
}
