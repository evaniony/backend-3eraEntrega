import { Schema, model } from "mongoose";

const schema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    products: {
		type: [
			{
				product: {
				//id del producto
				type: Schema.Types.ObjectId,
				ref: "products",
				required: true,
				//quantity: Number
				},
				quantity: { type: Number, default: 1 }
			},
					],
//por defecto tendra un array vacio.
	default: []
}

});

export const cartModel = model("cart", schema);