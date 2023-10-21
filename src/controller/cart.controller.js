import { cartService } from "../services/cart.service.js";

export const allCarts = async (req, res) => {
    const all = await cartService.getAll();
    return res.status(200).json({
        status: "success",
        msg: "TODOS LOS CARRITOS",
        payload: all
    });
}

export const cartById = async (req, res) =>{
    const { cid }  = req.params;
    const cartId = await cartService.getCart(cid);

        return res.status(200).json({
            status: "success",
            msg: "ESTE ES TU CARRITO ELEGIDO",
            payload: cartId
        });
};

export const addProduct = async(req, res) =>{
    try {
      const { cid, pid } = req.params;

      const cartUser = await cartService.addProduct(cid, pid);
      res.status(200).json({
        status: "success",
        message: "agregaste un producto!",
        payload: cartUser,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

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

export const putCartQty = async (req, res) =>{
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    console.log(cid, pid, quantity);

    const putCart = await cartService.putCart(cid, pid, quantity);

    return res.status(200).json({
        status: "success",
        msg: "Carrito actualizado! Visualiza tus productos:",
        putCart
      });
}

export const deleteProdQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.deleteProduct(cid, pid);
    res.status(200).json({
      status: "success",
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
       status: "error",
        message: "Internal server error" });
  }
}

export const deleteCart = async (req, res) =>{
    const { cid } = req.params;

  try {
      const dtlCart = await cartService.deleteArray(cid);
  
      return res.status(200).json({
          status: "success",
          msg: "Se borraron todos los productos!",
          dtlCart
        });
  } catch (error) {
    return res.status(500).json({
        status: "error",
        msg: "error al eliminar los productos",
        payload: {},
    
    })
  }

}

export const getRender = async (req, res) =>{
  try {
    const cartId = req.session.user.cartId;
    const cartUser = await cartService.getCart(cartId);
    const title = "Productos en Carrito";

    const { firstName, role, email } = req.session.user;
    const search = cartUser.products.map(doc => doc.toObject());
    res.status(200).render("carts", { search, cartId, title, firstName, role, email });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}