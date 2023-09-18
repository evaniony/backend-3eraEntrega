import { productService } from "../services/product.service.js";


export const getAllProducts = async (req, res) =>{

    const allProducts = await productService.getProducts();
    
        return res.status(200).json({
            status: "success",
            msg: "TODOS LOS PRODUCTOS",
            payload: allProducts
        });
}
/* class ProductController{

    getAllProducts = async (req, res) =>{
        const allProducts = await productService.getProducts();
        return res.status(200).json({
            status: "success",
            msg: "TODOS LOS PRODUCTOS",
            payload: allProducts
        });
    };
}; */
