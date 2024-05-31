
import './App.css';
import Nav from './Components/Navigation/NavBar';
import Footer from './Components/Navigation/Footer'

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import Products from './Components/Product/Products';
import ProductsByType from './Components/Product/ProductsByType';
import { Provider } from 'react-redux';
import { store } from './State/store';
import ProductInfo from './Components/Product/ProductInfo';
import { CartProvider } from './Context/CartContext';
import OrderCheckout from './Components/Order/OrderCheckout';
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CartProvider>
          <div>
            <Nav />
            <div>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Wszystko" element={<Products />} />
                <Route path="/:type" element={<ProductsByType />} />
                <Route path="/info/:id" element={<ProductInfo />} />
                <Route path="/order" element={<OrderCheckout />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </CartProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
