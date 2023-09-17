import  express  from "express";
export const routerProducts = express.Router();
import { productModel } from "../DAO/models/product.model.js";


routerProducts.get("/", async (req, res) =>{
      const { page } = req.query;
        console.log(page);
      const products = await productModel.paginate({}, { limit: 2, page: page || 1});
      let productos = products.docs.map((prod) => {
        return {
            id: prod._id.toString(),
             title: prod.title,
             price: prod.price,
             description: prod.description
             };
      });

        let links = [];
        for(let i = 0; i < products.totalPages; i++){
	        links.push({ label: i, href: "http://localhost:8080/products?page=" + i});
        };
        return res.status(200).render("products",
            {productos: productos,
            pagingCounter: products.pagingCounter,
            totalPages: products.totalPages,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            links: links
        });
    
})
