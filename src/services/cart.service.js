import { cart } from "../DAO/dao/cart.dao.js";
import { cartModel } from "../DAO/models/cart.model.js";
//18/09
//el metodo reutilizable del dao, hara que el sea menor codigo.
class CartService{
    getCart(cid){
        const cartId = cart.getCartById(cid);
            return cartId;
    };

    deleteProdToCart(cid, pid){
        const auth = cart.getCartById(cid);
        const filter = { _id: cid };
        const update = { $pull: { products: { product: pid } } };
        const result = cart.deleteProdCart(filter, update)
            return result;
    };

    updateCart(cid, pid){
        const authCart = cart.updateCart(cid);
        const filter = { _id: cid };
        const update = {
          $set: { 
            products: [...authCart.products, { product: pid }]
          }
        };
        const updatedCart = cartModel.updateOne(filter, update);
            return updatedCart;
    };

    putCart(cid, pid, quantity){
        const authCart = cart.qtyProd(cid);
        const filter = { _id: cid, "products._id": pid };
        const update = {
          $set: {
             "products.$.quantity": quantity
          }
        };
  
        const updatedProd = cartModel.updateOne(filter, update);
            return updatedProd;
};

    deleteArray(cid){
        const authCart = cart.deleteArrayCart(cid);
        const filter = { _id: cid };
        const update = { $set: { products: [] } };
        const result = cartModel.updateOne(filter, update);
            return result;
    }
}

export const cartService = new CartService();
