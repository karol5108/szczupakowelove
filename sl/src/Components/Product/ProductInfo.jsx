
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductServiceInstance from '../../Services/ProductService';
import ProductImages from './ProductImages';
import OrderServiceInstance from '../../Services/OrderService';
import { useCart } from '../../Context/CartContext';
import ShoppingCard from '../Order/ShoppingCard';
const ProductInfo = () => {
    // const [product, setProduct] = useState();
    const { id } = useParams();

    // product 
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [lowest30price, setLowest30price] = useState("");
    const [description, setDescription] = useState("");
    const [quantityInPack, setQuantityInPack] = useState(0);
    const [type, setType] = useState("");
    const [colorsImg, setColorsImg] = useState([]);
    const [colors, setColors] = useState(1);

    // order
    const [order, setOrder] = useState(null);
    const [quantity, setQuantity] = useState(1); // State dla ilości
    const [color, setColor] = useState("A"); // State dla koloru
    

    
    
  
    useEffect(() => {
      getProductById(id);
    }, [id]);
  
    const getProductById = (id) => {
      ProductServiceInstance.getProductById(id)
        .then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setPrice(response.data.price);
          setLowest30price(response.data.lowest30price);
          setDescription(response.data.description);
          setQuantityInPack(response.data.quantity);
          setType(response.data.type);
          setColorsImg(response.data.colorsImg);
          setColors(response.data.colors)
          localStorage.setItem('product', JSON.stringify(response.data));
          console.log(localStorage.getItem('product'))
          
        })
        .catch((error) => {
          console.log(error);
        });
    };


    const quantityOptions = [];
    const firstLetterCharCode = 'A'.charCodeAt(0);
    for (let i = 0; i < colors; i++) {
      const letter = String.fromCharCode(firstLetterCharCode + i);
      quantityOptions.push(letter);
    }
  
  // Funkcja obsługująca dodanie produktu do koszyka
  const handleAddToCart = () => {

    if(!localStorage.getItem('orderId')){
    OrderServiceInstance.newOrder(id, quantity, color)
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
        localStorage.setItem('orderId', response.data.id)
      })
      .catch((error) => {
        console.log(error);
      });
    } else{
      OrderServiceInstance.addToExistOrder(id, quantity, color, localStorage.getItem('orderId'))
        .then((response) => {
          console.log(response.data);
          
          setOrder(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
    }
    
    console.log('Product added to cart:', order);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  


  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6   bg-white">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          {/* Komponent wyświetlający obrazy produktu */}
          <ProductImages productName={name} productImg={colorsImg}/>
        </div>
        <div className="md:flex-1 px-4">
          {/* Komponent wyświetlający szczegóły produktu */}
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{name}</h2>
          <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">Spinpoler</a></p>
          <div className="flex items-center space-x-4 my-4">
            <div>
              {/* Komponent wyświetlający cenę produktu */}
              <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                <span className="font-bold text-indigo-600 text-3xl">{price}</span>
                <span className="text-indigo-400 mr-1 mt-1"> ZŁ</span>
              </div>
            </div>
            <div className="flex-1">
              {/* Komponent wyświetlający informacje o zniżce */}
              <p className="text-gray-500 text-sm">Najniższa cena z 30 dni: {lowest30price}</p>
            </div>
          </div>
          <p className="text-gray-500">{description}</p>
          <br></br>
          <p className="text-gray-500">Opakowanie: {quantityInPack} sztuki</p>
          <p className="text-gray-500">Rodzaj przynęty: {type}</p>
          <div className="flex py-4 space-x-4">
            <div className="relative">
              {/* Komponent wybierania ilości produktu */}
              <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1"
                      onChange={handleQuantityChange}
                      value={quantity}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="relative">
    {/* Komponent wybierania koloru produktu */}
    <select
      className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1"
      onChange={handleColorChange}
      value={color}>
      {quantityOptions.map((letter, index) => (
        <option key={index} value={letter}>{letter}</option>
      ))}
    </select>
  </div>
          </div>
          <div className="flex py-4 space-x-4">
            <button type="button" onClick={() => handleAddToCart()} className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
              DODAJ DO KOSZYKA
            </button>
          </div>

           {order && <ShoppingCard order={order}/>} 
        </div>
      </div>
    </div>
    </div>
  )
}
export default ProductInfo;