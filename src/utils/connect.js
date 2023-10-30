import { connect } from "mongoose";
import { productModel } from "../DAO/models/product.model.js";
import { cartModel } from "../DAO/models/cart.model.js";
//import { env } from "../config.js";
import { enviroment } from "../env.config.js";
export async function connectMongo() {
  try {
    await connect(enviroment.MONGO_URL);
  } catch (e) {
    throw "Falló la conexion";
  }
}
