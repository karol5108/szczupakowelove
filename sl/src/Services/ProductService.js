import axios from "axios";

// const PRODUCT_API_URL = 'https://szczupakowelove.onrender.com/products'
const PRODUCT_API_URL = 'http://localhost:8080/products'

class ProductService{
    getAllProducts(){
            return axios.get(PRODUCT_API_URL)
    }
    getAllProductsByType(type){
        return  axios.get(PRODUCT_API_URL + '/' + type)
    }
    getProductByNameAndSize(name,size){
        return axios.get(PRODUCT_API_URL + '/' + name + '/' + size)
    }
    getProductById(id){
        return axios.get(PRODUCT_API_URL + '/getById/' + id)
    }
   
}
const ProductServiceInstance = new ProductService();
export default ProductServiceInstance;

