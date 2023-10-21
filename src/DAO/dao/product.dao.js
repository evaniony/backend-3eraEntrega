import { productModel } from "../models/product.model.js";

class Product {
    //obtener todos los productos --- PASA AL SERVICE
    async getProducts(){
      const products = await productModel.find();
      return products;
    };

    async getProdById(id){
      const find = await productModel.findOne({_id: id});
            return find;
    }

    async createProd(){
      const {title, description, price, thumbnail, code, stock, category, status} = req.body;
      const newProd = productModel.create({title, description, price, thumbnail, code, stock, category, status});
      return newProd;
    }
};

export const product = new Product();


/* const { page } = req.query;
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
    
     */