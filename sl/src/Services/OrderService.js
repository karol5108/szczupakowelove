import axios from "axios";
import { API_BASE_URL } from "../Config/apiConfig";

// const ORDER_API_URL = 'https://szczupakowelove.onrender.com/orders'
// const ORDER_API_URL = 'http://localhost:8080/orders'

class OrderService{

    getOrderById(id){
        return axios.get(API_BASE_URL + '/orders/' + id)
    }
    newOrder(id, quantity, color){
        return axios.post(API_BASE_URL + '/orders/new-order/' + id + '/' + quantity + '/' + color )
    }
    addToExistOrder(id, quantity, color, orderId){
        return axios.post(API_BASE_URL + '/orders/add-to-exist/' + id + '/' + quantity + '/' + color + '/' + orderId )
    }
    deleteOrder(id){
        return axios.delete(API_BASE_URL + '/orders/' + id)
    }
   
}
const OrderServiceInstance = new OrderService();
export default OrderServiceInstance;