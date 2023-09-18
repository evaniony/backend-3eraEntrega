import { cartService } from "../services/cart.service.js";

export const cartById = async (req, res) =>{
    const { cid }  = req.params;
    const cartId = await cartService.getCart(cid);

        return res.status(200).json({
            status: "success",
            msg: "ESTE ES TU CARRITO ELEGIDO",
            payload: cartId
        });
};

export const deleteProdToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const cartId = await cartService.deleteProdToCart(cid, pid);

    if (cartId.modifiedCount > 0) {
        res.status(200).json(
            { message: "PRODUCTO BORRADO SATISFACTORIAMENTE;" });
    } else {
        res.status(404).json(
            { message: "PRODUCTO NO ENCONTRADO EN EL CARRITO" });
    }
};

export const updateCart = async (req, res) =>{
    const { cid }  = req.params;
    const { pid } = req.body;

    const update = await cartService.updateCart(cid, pid)

        return res.status(200).json({
            status: "success",
            msg: "ACTUALIZASTE UN PRODUCTO",
            payload: update
        });
};

export const putCartQty = async (res, res) =>{
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const putCart = await cartService.putCart(cid, pid, quantity);

    return res.status(200).json({
        status: "success",
        msg: "Carrito actualizado! Visualiza tus productos:",
        putCart
      });
}

export const deleteCart = async (res, res) =>{
    const { cid } = req.params;

    const dtlCart = await cartService.deleteArray(cid);

    return res.status(200).json({
        status: "success",
        msg: "Se borraron todos los productos!",
        dtlCart
      });
}
