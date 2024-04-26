
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ProductServiceInstance from '../../Services/ProductService';
import { Menu } from '@headlessui/react';


const ProductsByType = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { type } = useParams();
  const [priceFilter, setPriceFilter] = useState(150);


  useEffect(() => {
    getProductsByType(type);
  }, [type]);

  const getProductsByType = (type) =>{
    ProductServiceInstance.getAllProductsByType(type)
        .then((response) =>{
            setProducts(response.data);
            setFilteredProducts(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
  }


  const handlePriceFilterChange = (event) => {
    const price = parseInt(event.target.value);
    setPriceFilter(price);
    const filtered = products.filter((product) => product.price <= price);
    setFilteredProducts(filtered);
  };




  const filterProductsBySize = (size) => {
    let filtered;
    if (size === 'All') {
      setFilteredProducts(products);
      return;
    } else if (size === 'Small') {
      filtered = products.filter((product) => product.size <= 7.5);
    } else if (size === 'Medium') {
      filtered = products.filter((product) => product.size > 7.5 && product.size <= 15);
    } else if (size === 'Large') {
      filtered = products.filter((product) => product.size > 15);
    }
    setFilteredProducts(filtered);
  };


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-10">
          <div className="hidden lg:block col-span-1">
            <div className="sticky top-0 space-y-6">
              <Menu as="div" className="space-y-1">
                <Menu.Button className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                  Rozmiar
                </Menu.Button>
                <Menu.Items className="absolute left-0 z-10 mt-2 w-full bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          onClick={() => filterProductsBySize('All')}
                        >
                          Wszystkie
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          onClick={() => filterProductsBySize('Small')}
                        >
                          Małe
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          onClick={() => filterProductsBySize('Medium')}
                        >
                          Średnie
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          onClick={() => filterProductsBySize('Large')}
                        >
                          Duże
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
              <Menu as="div" className="space-y-1">
                <Menu.Button className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                  Cena
                </Menu.Button>
              <Menu.Items className="absolute left-0 z-10 mt-2 w-full bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                <Menu.Item>
                  <div className="mt-6">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Cena
                    </label>
                      <input
                        type="range"
                        min="0"
                        max="150"
                        value={priceFilter}
                        onChange={handlePriceFilterChange}
                        className="mt-1 range-input"
                      />
                      <p className="text-sm text-gray-500">{priceFilter} zł</p>
                  </div>
                  </Menu.Item>
              </div>
             </Menu.Items>
            </Menu>
            </div>
          </div>
        
          <div className="col-span-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <a href={`/info/${product.id}`}></a>
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.img}
                      alt={product.description}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                          <a href={`/info/${product.id}`}>  
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name} {product.size}cm
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.colors} kolorów</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price} zł</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsByType;
