import axios from "axios";

const ORDER_API_URL = 'https://szczupakowelove.onrender.com/orders'

class OrderService{

    getOrderById(id){
        return axios.get(ORDER_API_URL + '/' + id)
    }
    newOrder(id, quantity, color){
        return axios.post(ORDER_API_URL + '/new-order/' + id + '/' + quantity + '/' + color )
    }
    addToExistOrder(id, quantity, color, orderId){
        return axios.post(ORDER_API_URL + '/add-to-exist/' + id + '/' + quantity + '/' + color + '/' + orderId )
    }
    deleteOrder(id){
        return axios.delete(ORDER_API_URL + '/' + id)
    }
   
}
const OrderServiceInstance = new OrderService();
export default OrderServiceInstance;