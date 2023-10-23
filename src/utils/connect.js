import { connect } from "mongoose";
import { productModel } from "../DAO/models/product.model.js";
import { cartModel } from "../DAO/models/cart.model.js";
//import { env } from "../config.js";
export async function connectMongo() {
  try {
    await connect("mongodb+srv://evaniony:rPapt8OncnP10D43@ebi-cluster.lazfhch.mongodb.net/?retryWrites=true&w=majority" /* config.mongoUrl */);
  } catch (e) {
    throw "Falló la conexion";
  }
}
