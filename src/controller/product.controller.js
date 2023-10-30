import { productService } from "../services/product.service.js";
import ProductsDTO from "../DAO/dto/product.dto.js";
import { cartService } from "../services/cart.service.js";
import { product } from "../DAO/dao/product.dao.js";


export const getAllProducts = async (req, res) =>{

    try {
        const allProducts = await productService.getProducts();
    
        return res.status(200).json({
            status: "success",
            msg: "TODOS LOS PRODUCTOS",
            payload: allProducts
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "error al visualizar los productos",
            payload: {},
        
        })
    }
}

export const getProdById = async (req, res) =>{
    try {
        const { id } = req.params;
        const prodId = await productService.ProdById(id);

        return res.status(200).json({
            status: "success",
            msg: "producto elegido!",
            payload: prodId
        });
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "error al visualizar filtrar productos!",
            payload: {},
        
        })
        
    }
}

export const createNewProducts = async (req, res) =>{
    try{
        const {title, description, price, thumbnail, code, stock, category, status} = req.body;
        const newProd = new ProductsDTO({
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status
        });
        const prodResult = productService.createProduct(newProd);
    } catch (error){
        return res.status(500).json({
            status: "error",
            msg: "error al generar nuevos productos",
            payload: {},
        
        })

    }
}

export const renderProducts = async (req, res) => {
    try{
    /* const { cid } = req.body;
    const cart = await cartService.getCart(cid);
    const cartQuantity = cart.products.reduce((total, product) => {
        return total + product.quantity;
    }, 0); */
    const firstName = req.session.user.firstName;

    let data = await product.getProducts();
    let products = [];
        products =  data.map(prod => {
            return {
                title: prod.title,
                price: prod.price,
                description: prod.description
                };
        });
        console.log(req.session.user);
    /* let productos = await products.map((prod) => {
        return {
             title: prod.title,
             price: prod.price,
             description: prod.description
             };
      }); */
    //const firstName = req.session.user.firstName;
    const title = "Listado de Productos";
    return res.render("products", {title, products, firstName});
} catch (e) {
    console.log(e);
  res.status(500).send(
    { status: "error",
    msg: "Error en el servidor",
    error: e.msg });
}
}
