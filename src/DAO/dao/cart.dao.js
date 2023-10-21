import { cartModel } from "../models/cart.model.js";
//18/09
//crear metodo de actualizacion reutilizable;
class Cart {

    getAllCarts = async () => {
        const allCarts = await cartModel.find();
        return allCarts;
    }

    updateCart = async (a, b) => {
        const result = await cartModel.updateOne(a, b);
        return result;  
    };

    findById = async (cid) => {
        const find = await cartModel.findById({_id: cid});
            return find;
    };

    async createCart(cartId) {
        const cartCreated = await cartModel.create({ _id: cartId });
        return cartCreated;
}
};

export const cart = new Cart();