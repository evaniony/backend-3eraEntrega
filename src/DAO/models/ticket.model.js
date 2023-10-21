import { Schema, model } from "mongoose";

const schema = new Schema({
        code: { type: Number, default: Math.floor(Math.random() * (10000 - 100 + 100)) + 100},
        purchase_datetime: { type: Date, required: true, default: Date.now },
	    purchaser: { type: String, required: true },
        //id del carrito
	    cartId: { type: String, required: true },
        //total de la compra
	    amount: { type: Number, required: true },

	    products: [
		{
			product: { type: Schema.Types.ObjectId, ref: "products" },
			quantity: { type: Number, required: true },
		},
	],
});

export const ticketModel = model("ticket", schema);