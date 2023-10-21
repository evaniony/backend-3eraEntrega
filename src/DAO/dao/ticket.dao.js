import { ticketModel } from "../models/ticket.model.js";

class Ticket{
    //finalizar la compra del carrito; se espera
    //busqueda por codigo de ticket
    async ticketById(code){
        const ticket = await ticketModel.findOne({ code });
        return ticket;
    };

    //busqueda de id de ticket
    async ticketForCart(id){
        const ticketCart = await ticketModel.find(id);
        return ticketCart;
    };

    async ticketCreated(purchase){
        const created = await ticketModel.create(purchase);
        return created;
    }


}

export const ticket = new Ticket();