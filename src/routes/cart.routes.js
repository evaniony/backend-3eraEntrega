import express from "express";
export const routerCart = express.Router();
import { cartModel } from "../DAO/models/cart.model.js";

/* DELETE api/carts/:cid/products/:pid
 deberá eliminar del carrito el producto seleccionado. */

 //Y NO ES GET - ES DELETE


 routerCart.get("/:cid", async (req, res) =>{
    const { cid }  = req.params;
    const findCart = await cartModel.findOne({_id: cid});

    return res.status(200).json(
        {status: "ok!",
        msg: "encontramos algo",
        data: findCart
    });

});

routerCart.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    
    try {
        const filter = { _id: cid };
        const update = { $pull: { products: { product: pid } } };
        
        const result = await cartModel.updateOne(filter, update);
        
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Product removed from cart successfully." });
        } else {
            res.status(404).json({ message: "Product not found in the cart." });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred while removing the product from the cart." });
    }
});

//actualizar
routerCart.put("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const { pid } = req.body;
  
      //verifica si el carrito existe
      let authCart = await cartModel.findOne({ _id: cid });
  
      if (!authCart) {
        return res.status(404).json({
          status: "error",
          msg: "Carrito no encontrado"
        });
      } else {
        // Actualiza el carrito 
        const filter = { _id: cid };
        const update = {
          $set: { 
            products: [...authCart.products, { product: pid }]
          }
        };
  
        const updatedCart = await cartModel.updateOne(filter, update);
  
        return res.status(200).json({
          status: "ok",
          msg: "Carrito actualizado! Visualiza tus nuevos productos:",
          updatedCart
        });
      }
    } catch (error) {
      console.error("Error actualizando los productos:", error);
  
      return res.status(500).json({
        status: "error",
        msg: "Error interno del servidor"
      });
    }
  });

  routerCart.put("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
  
      let authCart = await cartModel.findOne({ _id: cid });
  
      if (!authCart) {
        return res.status(404).json({
          status: "error",
          msg: "Carrito no encontrado"
        });
      } else {
        // A través de req.body, determinamos una nueva cantidad para el objeto.
        const filter = { _id: cid, "products._id": pid };
        console.log(filter); // Encuentra el producto en el array "products" usando su id
        const update = {
          $set: {
             "products.$.quantity": quantity
                //"products.$.quantity": value
            } // Actualiza la cantidad del producto en el carrito
        };
        console.log(update);
  
        const updatedProd = await cartModel.updateOne(filter, update);
        console.log(updatedProd);
  
        if (updatedProd.modifiedCount > 0) {
          return res.status(200).json({
            status: "ok",
            msg: "Carrito actualizado! Visualiza tus productos:",
            updatedProd
          });
        } else {
          return res.status(401).json({
            status: "error",
            msg: "Espera, hubo un error",
          });
        }
      }
    } catch (e) {
      console.error("Error actualizando los productos:", e);
      return res.status(500).json({
        status: "error",
        msg: "Error interno del servidor",
        msg: e.message
      });
    }
  });


//DELETE api/carts/:cid deberá eliminar todos los productos del carrito (ojo! vaciar el array)
routerCart.delete("/:cid", async (req, res) =>{
    try {
        const { cid } = req.params;
        let authCart = await cartModel.findOne({ _id: cid });

        if (!authCart) {
            return res.status(404).json({
              status: "error",
              msg: "Carrito no encontrado"
            });
          } else {

            const filter = { _id: cid };
            const update = { $set: { products: [] } };
        
            const result = await cartModel.updateOne(filter, update);

            if (result.modifiedCount > 0) {
                return res.status(200).json({
                  status: "ok",
                  msg: "Se borraron todos los productos!",
                  result
                });
              } else {
                return res.status(401).json({
                  status: "error",
                  msg: "Espera, hubo un error",
                });
              }
            };


    } catch (e) {
        console.error("Error actualizando los productos:", e);
        return res.status(500).json({
        status: "error",
        msg: "Error interno del servidor",
        msg: e.message
      });
    }
})



 