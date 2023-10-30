import { ticketService } from "../services/ticket.service.js";
import { cartService } from "../services/cart.service.js";
import TicketsDTO from "../DAO/dto/ticket.dto.js";

class TicketController{
    async ticketById(req, res) {
		try {
			const code = req.params.tid;
			const ticket = await ticketService.ticketId(code);
			//logger.info(ticket);
			return res.status(201).json({
				status: "success",
				msg: "Detalles del ticket",
				payload: {
					id: ticket._id,
					code: ticket.code,
					dateTime: ticket.purchase_datetime,
					user: ticket.purchaser,
					cartId: ticket.cartId,
					products: ticket.products,
					totalPurchase: ticket.amount,
				},
			});
		} catch (e) {
			//logger.error(e.message);
			res.status(500).json({ error: "Error en el servidor" });
		}
	}

	async getAllticket(_, res) {
		try {
			const ticket = await ticketService.ticketAll();
			return res.status(200).json({
				status: "success", ticket});
		} catch (e) {
			//logger.error(e.message);
			res.status(500).json({ error: "Error en el servidor" });
		}
	}

	async ticketRender(req, res) {
		try {
			const user = req.session.user;
			const cart = await cartService.getCart(user.cartId);
			const tickets = await ticketService.ticketAll(cart._id);

			if (cart._id === tickets[0].cartId) {
				const formattedTickets = await ticketService.ticketGenerated(tickets);
				const title = "Listado de compras realizadas";
				res.status(200).render("purchases", {
					user,
					title,
					formattedTickets,
				});
			} else {
				console.log("Solo puedes ver los tickets que hayas generado con tu usuario");
				throw Error;
			}
		} catch (e) {
			res.status(500).json({ error: "Error en el servidor" });
		}
	}

	async create(req, res) {
		try {
			const { usuario, cart_id, total } = req.body;
			req.session.user = usuario;
			//se supone que estamos en el ambito del usuario logeado
			const purchase = new TicketsDTO({
				usuario,
				cart_id,
				total,
			});
			//busca el carrito;
			const cartData = await cartService.getCart(cart_id);
			const newTicket = await ticketService.create(purchase, cartData.products);

			return res.status(201).json({
				status: "success",
				msg: "Ticket generado! Gracias por tu compra, pana",
				payload: newTicket
			});
		} catch (e) {
			//logger.error(e.message);
			//res.status(403).json({ msg: "se ha generado, pero no se visualiza correctamente" });
			res.status(500).json({ msg: "ERROR DEL SERVIDOR" });
		}
	}
}

export const ticketController = new TicketController();