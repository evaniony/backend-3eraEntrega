//importar clase
import { product } from "../DAO/dao/product.dao.js";

class ProductService{
  async getProducts(){
    const result = await product.getProducts();
        return result;
  };

  async ProdById(prod){
    const prodId = await product.getProdById(prod);
            return prodId;
  }
  async createProduct(product) {
			const create = await product.createProd(product);
			return create;
  };

}


export const productService = new ProductService();