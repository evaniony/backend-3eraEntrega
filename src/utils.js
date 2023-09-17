import { connect } from "mongoose";
import { productModel } from "./DAO/models/product.model.js";
import { cartModel } from "./DAO/models/cart.model.js";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://evaniony:rPapt8OncnP10D43@ebi-cluster.lazfhch.mongodb.net/?retryWrites=true&w=majority"
    );


   /*  //await cartModel.insertMany([{product: []}]); */
   /*  let cart = await cartModel.findOne({ _id: '64ca679de7681a7250107a5a'});
    //cart.products.push({ product: '64bfac870fe851eeb1c159cd' });
    cart.products.push({ product: '64bfac870fe851eeb1c159cc' });
    cart.products.push({ product: '64bfac870fe851eeb1c159cf' });
    let res = await cartModel.updateOne({_id: '64ca679de7681a7250107a5a'}, cart); 
/*     await productModel.insertMany([
      {title: "Taza", description: "Taza de ceramica", price: 2500, thumbnail: "taza.jpg", code: 1001, category: "bazar", stock: 10},
      {title: "Plato", description: "Plato de ceramica", price: 1500, thumbnail: "articulo-2.jpg", code: 2001, category: "bazar", stock: 10},
      {title: "Maceta", description: "Maceta de ceramica", price: 1700, thumbnail: "articulo-3", code: 3001, category: "bazar", stock: 10},
      {title: "Florero", description: "Florero de ceramica print", price: 3000, thumbnail: "articulo-4", code: 4001, category: "deco", stock: 10},
      {title: "Bandeja", description: "Bandeja de ceramica print", price: 2900, thumbnail: "articulo-5", code: 5001, category: "deco", stock: 10}
  ]); */

 /*  let carrito = await cartModel.find().populate("products.product");
  console.log(JSON.stringify(carrito, null, 2)); */

 /*  let res = await productModel.find();
  console.log(res); */
  /* const res = await productModel.paginate({}, { limit: 2, page: 5});
  console.log(res); */


    console.log("plug to mongo!");
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
};
