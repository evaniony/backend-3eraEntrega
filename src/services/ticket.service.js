import { ticket } from "../DAO/dao/ticket.dao.js";
import { product } from "../DAO/dao/product.dao.js";
import { cart } from "../DAO/dao/cart.dao.js";
import { userModel } from "../DAO/models/users.model.js";
import { cartService } from "./cart.service.js";

class TicketService{
    async ticketId(code){
        const ticketgenerated = await ticket.ticketById(code);
        return ticketgenerated;
    };

    async ticketAll(id){
        const alltickets = await ticket.getAllticket();
        return alltickets;
    };

    async ticketGenerated(tickets){
        try {
            //tener en cuenta que el carrito contiene un array de productos
            const ticketFormatted = [];
            console.log(ticketFormatted);

            for (const result of tickets) {
                //products es el array que contiene el ticket
                //mapear el array productos, y obtener el producto del producto de productos??
            const productid = result.products.map(product => product.product);
            //luego de haber obtenido los productos del ticket
            //filtramos por id a cada producto;
            const productsList = await product.getProdById(productid);

            const products = productsList.map((product, index) => ({
                title: product.title,
                image: product.thumbnail,
                quantity: ticket.products[index].quantity,
              }));

              const formattedDate = new Date(ticket.purchase_datetime);
              
              //quiero obtener los precios de los productos 
              const amount = productsList.reduce((acc, product) => acc + (product.price * product.quantity), 0)

              ticketFormatted.push({
                code: ticket.code,
                purchase_datetime: formattedDate,
                amount: amount,
                products: products,
        });
            }
            return ticketFormatted;
            
        } catch (error) {
            return res.status(500).json({
                status: "error",
                msg: "error al generar ticket",
                payload: {},
            
            })
          }
        };

        async stock(products) {
            try {
              for (const producto of products) {
                //aplanar id
                const productId = producto.product.toString();
                const productRest = await product.getProdById(productId);

                if (productRest.stock >= producto.quantity) {
                  productRest.stock = productRest.stock - 1;
                  await productRest.save();

                  console.log(`Stock descontado correctamente. El Stock actual es de: ${productRest.stock}`);
                } else {
                  console.log(`No hay suficiente stock para el producto ${productId}`);
                  return false;
                }
              }
              return true;
            } catch (e) {
                return res.status(500).json({
                    status: "error",
                    msg: "error al verificar stock",
                    payload: {},
                
                });
            }
          };

          async create(purchase, products, user) {
            try {
              const stockCheck = await this.stock(products);

              if (stockCheck) {
                const cartid = await cartService.getCart(purchase.cartId);
                purchase.products = cartid.products;
                const newTicket = await ticket.ticketCreated(purchase);
        
                await userModel.findOneAndUpdate({ _id: user._id }, { $push: { purchase_made: newTicket.code } });
        
                await cartService.clearCart(purchase.cartId);
        
                return newTicket;
              } else {
                console.log("No se pudo crear el ticket debido a la falta de stock");
              }
            } catch (e) {
                return res.status(500).json({
                    status: "error",
                    msg: "error al verificar stock",
                    payload: {},
                
                });
            }
          }
}

export const ticketService = new TicketService();