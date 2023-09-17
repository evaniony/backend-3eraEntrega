import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const schema = new Schema({
        //first_name: { type: String }
        title: { type: String },
        description: { type: String },
        price: { type: Number },
        thumbnail: { type: String },
        code: { type: Number },
        stock: { type: Number, max: 100 },
        category: { type: String },
        status: { type: Boolean, default: true }
    });

 schema.plugin(mongoosePaginate);
 export const productModel = model("products", schema);