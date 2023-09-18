//importar clase
import { product } from "../DAO/dao/product.dao.js";

class ProductService{
  getProducts(){
    const result = product.getProducts();
        return result;
  };
}


export const productService = new ProductService();