import axios from "axios";
import { API_BASE_URL } from "../Config/apiConfig";

// const ORDER_API_URL = 'https://szczupakowelove.onrender.com/orders'
// const ORDER_API_URL = 'http://localhost:8080/orders'

class UserService{

    addNewAddress(userId, newAddress){
        return axios.put(API_BASE_URL + '/user/new-address/' + userId, newAddress)
    }

    getAddressesByUserId(userId){
        return axios.get(API_BASE_URL + '/user/addresses/' + userId)
    }

    getOrdersByUserId(userId){
        return axios.get(API_BASE_URL + '/user/orders/' + userId)
    }


   
}
const UserServiceInstance = new UserService();
export default UserServiceInstance;