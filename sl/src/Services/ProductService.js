import axios from "axios";
import { API_BASE_URL } from "../Config/apiConfig";

class ProductService{
    getAllProducts(){
            return axios.get(API_BASE_URL + '/products')
    }
    getAllProductsByType(type){
        return  axios.get(API_BASE_URL + '/products/' + type)
    }
    getProductByNameAndSize(name,size){
        return axios.get(API_BASE_URL + '/products/' + name + '/' + size)
    }
    getProductById(id){
        return axios.get(API_BASE_URL + '/products/getById/' + id)
    }
   
}
const ProductServiceInstance = new ProductService();
export default ProductServiceInstance;

