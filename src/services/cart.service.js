import { cart } from "../DAO/dao/cart.dao.js";
import { product } from "../DAO/dao/product.dao.js";
//18/09
//el metodo reutilizable del dao, hara que el sea menor codigo.
class CartService{
    async getAll(){
        const carts = await cart.getAllCarts();
            return carts;
    };

    async getCart(cid){
        const cartId = await cart.findById(cid);
            return cartId;
    };

    async getCartCreated(cartId) {
        const cartCreated = await cart.createCart(cartId);
        return cartCreated;
}
    //testing
    async addProduct(cartId, productId) {
		try {
			const cartUser = await cart.findById(cartId);
			const chosenProduct = await product.getProdById(productId);

			if (!cartUser) {
				throw new Error("Cart not found");
			}
			if (!chosenProduct) {
				throw new Error("Product not found");
			}

            //console.log(cartUser, chosenProduct);
			const existingProduct = cartUser.products.find(item => item.product.toString() === chosenProduct._id.toString());
            //agregar una condicional donde dectecte que es el mismo _id del producto
            //y que incremente la cantidad, no que se sume uno mas

			if(existingProduct){
                existingProduct.quantity++;
            
			} else {
			    cartUser.products.push({ product: chosenProduct._id, quantity: 1 });
			}

			cartUser.save();

			const updatedCart = await this.getCart(cartId);
			const cartQuantity = updatedCart.products.reduce((total, product) => {
                return total + product.quantity});

			return { cart: updatedCart, cartQuantity };
		} catch (error) {
            console.log(error);
			throw error;
		}
	};

    async deleteProdToCart(cid, pid){
        const auth = await cart.findById(cid);

        const filter = { _id: cid };
        //estoy tomando el id del producto respectivo; no el id del propio objeto. 
        const update = { $pull: { products: { product: pid } } };
        const result = await cart.updateCart(filter, update);
            return result;
    };

    async deleteProduct(cartId, productId) {
		try {
			const getCart = await cart.findById(cartId)

			if (!getCart) {
				throw new Error("Cart not found");
			}

			const productIndex = cart.products.map(product => product.product.toString()).indexOf(productId);

			if (productIndex !== -1) {
				cart.products.splice(productIndex, 1);
				await cart.save();
			} else {
				logger.error("Producto no encontrado");
			}

			const updatedCart = await cart.updateCart(cartId, productIndex);

			return updatedCart;
		} catch (error) {
			throw new Error("Error removing product from cart");
		}
	}

    async updateCart(cid, pid){
        const authCart = await cart.findById(cid);
        const filter = { _id: cid };
        const update = {
          $set: { 
            products: [...authCart.products, { product: pid }]
          }
        };
        const updatedCart = await cart.updateCart(filter, update);
            return updatedCart;
    };

    async putCart(cid, pid, quantity){
        //es el _id del producto en el carrito; no el producto en si mismo.
        const authCart = await cart.findById(cid);
        const filter = { _id: cid, "products._id": pid };
        const update = {
          $set: {
             "products.$.quantity": quantity
          }
        };
  
        const updatedProd = await cart.updateCart(filter, update);
            return updatedProd;
};

    async deleteArray(cid){
        const authCart = await cart.findById(cid);

        const filter = { _id: cid };
        const update = { $set: { products: [] } };

        const result = await cart.updateCart(filter, update);
            return result;
    }

    async clearCart(cid) {
		try {
			const cartId = await cart.findById(cid);
			cart.products = [];
			await cartId.save();
		} catch (error) {
			throw new Error("Error clearing cart");
		}
	}

    
}

export const cartService = new CartService();
