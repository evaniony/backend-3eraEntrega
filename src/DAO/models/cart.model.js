import { Schema, model } from "mongoose";

const schema = new Schema({
    _id: {type: Schema.Types.ObjectId},
    products: {
		type: [
			{
				product: {
				//id del producto
				type: Schema.Types.ObjectId,
				ref: "products",
				//quantity: Number
				},
			},
					],
//por defecto tendra un array vacio.
	default: []
}

});

export const cartModel = model("cart", schema);