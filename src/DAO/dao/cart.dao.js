import { cartModel } from "../models/cart.model.js";
//18/09
//crear metodo de actualizacion reutilizable;
class Cart {
    getCartById = async (cid) => {
        const findCart = await cartModel.findOne({_id: cid});
            return findCart;
    };

    //no, se me ocurrira otro tipo de nombre para el parametro;
    deleteProdCart = async (a, b) => {
        const result = await cartModel.updateOne(a, b);
        return result;  
    };

    updateCart = async (cid) => {
        let authCart = await cartModel.findOne({ _id: cid });
            return authCart;
    };

    qtyProd = async (cid) => {
        let authCart = await cartModel.findOne({ _id: cid });
        return authCart;

    };

    deleteArrayCart = async (cid) =>{
        let authCart = await cartModel.findOne({ _id: cid });
        return authCart;
    }
};

export const cart = new Cart();