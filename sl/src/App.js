
import './App.css';
import Nav from './Components/Navigation/NavBar';
import Footer from './Components/Navigation/Footer'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Products from './Components/Product/Products';
import ProductsByType from './Components/Product/ProductsByType';
import ProductCard from './Components/Product/ProductCard';
import ProductInfo from './Components/Product/ProductInfo';
import { CartProvider } from './Context/CartContext';
import OrderCheckout from './Components/Order/OrderCheckout';
function App() {
  return (
    <Router>
    <CartProvider>
    <div >
      <Nav/>
      <div>
        <Routes>
            <Route exac path="" element ={<HomePage/>} />
            <Route path ="/Wszystko" element = {<Products/>}/>
            <Route path ="/:type" element = {<ProductsByType/>}/>
            <Route path ="/:type" element = {<ProductsByType/>}/>
            <Route path ="/:type" element = {<ProductsByType/>}/>
            <Route path ="/:type" element = {<ProductsByType/>}/>
            <Route path = "/info/:id" element = {<ProductInfo/>}/>
            <Route path = "/order" element = {<OrderCheckout/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
    </CartProvider>
    </Router>
  );
}

export default App;
