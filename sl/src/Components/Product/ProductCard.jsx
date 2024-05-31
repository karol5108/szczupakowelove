import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductServiceInstance from '../../Services/ProductService';
const ProductCard = () => {
  const [product, setProduct] = useState();
  const { name, size } = useParams();
  
  useEffect(() => {
    getProductByNameAndSize(name, size);
  }, [name, size]);
  useEffect(() => {
    console.log(product);
  }, [product]);
  
  const getProductByNameAndSize = (name, size) => {
    ProductServiceInstance.getProductByNameAndSize(name, size)
      .then((response) => {
        console.log(response.data); // Sprawdź dane zwracane przez API
        setProduct(response.data); // Ustaw pojedynczy produkt
        
      })
      .catch((error) => {
        console.log(error);
      });

    }

  // Funkcja obsługująca dodanie produktu do koszyka
  const handleAddToCart = () => {
    // Tutaj możesz dodać logikę obsługi dodawania produktu do koszyka
    console.log('Product added to cart:', product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 bg-white">
      <div className="flex flex-col md:flex-row -mx-4">
        <div className="md:flex-1 px-4">
          {/* Komponent wyświetlający obrazy produktu */}
          <ProductImages />
        </div>
        <div className="md:flex-1 px-4">
          {/* Komponent wyświetlający szczegóły produktu */}
          <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{name}</h2>
          <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">ABC Company</a></p>
          <div className="flex items-center space-x-4 my-4">
            <div>
              {/* Komponent wyświetlający cenę produktu */}
              {/* <ProductPrice price={products[0].price} /> */}
            </div>
            <div className="flex-1">
              {/* Komponent wyświetlający informacje o zniżce */}
              <ProductDiscount />
            </div>
          </div>
          {/* <p className="text-gray-500">{product.description}</p> */}
          <div className="flex py-4 space-x-4">
            <div className="relative">
              {/* Komponent wybierania ilości produktu */}
              <ProductQuantitySelector />
            </div>
            <button type="button" onClick={handleAddToCart} className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Przykładowe komponenty pomocnicze, które można użyć do wyświetlenia różnych części produktu
const ProductImages = () => {
  return (
    <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
      {/* Komponent wyświetlający obrazy produktu */}
    </div>
  );
};

const ProductPrice = ({ price }) => {
  return (
    <div className="rounded-lg bg-gray-100 flex py-2 px-3">
      
      <span className="font-bold text-indigo-600 text-3xl">{price}</span>
      <span className="text-indigo-400 mr-1 mt-1"> ZŁ</span>
    </div>
  );
};

const ProductDiscount = () => {
  return (
    <div>
      {/* Komponent wyświetlający informacje o zniżce */}
    </div>
  );
};

const ProductQuantitySelector = () => {
  return (
    <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  );
};

export default ProductCard;
