import React, { useEffect, useState } from "react";
import OrderServiceInstance from "../../Services/OrderService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../State/store';
import UserServiceInstance from "../../Services/UserService";
const OrderCheckout = () => {

    const [order, setOrder] = useState();
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null);
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((store) => store)

    useEffect(() => {
        handleFetchOrder();
    }, [])

    useEffect(() => {
        if (jwt && auth.user) {
            UserServiceInstance.getAddressesByUserId(auth.user.id)
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setAddresses(response.data);
                    } else {
                        setAddresses([]);
                    }
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    setAddresses([]); 
                });
        }
    }, [jwt,auth.user]);
    
    const handleAddressChange = (event) => {
        const addressId = event.target.value;
        const address = addresses.find(addr => addr.id === parseInt(addressId));
        setSelectedAddress(address);
    };
    const handleFetchOrder = () => {
        if (localStorage.getItem('orderId')) {
            OrderServiceInstance.getOrderById(localStorage.getItem('orderId'))
                .then((response) => {
                    console.log(response.data)
                    setOrder(response.data);
                }).catch((error) => {
                    console.log('Error fetching order with ID: ', localStorage.getItem('order'));
                })

        } else {
            console.log("dont have any order yet");
        }
    }

    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1); // Przenosi do poprzedniej strony w historii
    };

    if (!order || !addresses) {
        return (
            <div>
                <p>ORDER LOADING ...</p>
            </div>
        )
    }

    return (



        <div className="min-w-screen min-h-screen bg-gray-50 py-5">
            <div className="px-5">
                <div className="mb-2">
                    <button onClick={() => handleBackClick()} className="focus:outline-none hover:underline text-gray-500 text-sm">Back</button>
                </div>
                <div className="mb-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-600">Podsumowanie.</h1>
                </div>
                
            </div>
            <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
                <div className="w-full">
                    <div className="-mx-3 md:flex items-start">
                        <div className="px-3 md:w-7/12 lg:pr-10">
                            <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                                {order.lines.map((line) => (
                                    <div key={line.id} className="w-full flex items-center">
                                        <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                                            <img
                                                src={`/${line.product.name}/${line.color}.jpg`}
                                                alt={line.product.name} />
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <h6 className="font-semibold uppercase text-gray-600">
                                                {line.product.name} {line.product.size} cm
                                            </h6>
                                            <p>Kolor: {line.color}</p>
                                            <p className="text-gray-400">x {line.quantity}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-600 text-xl">
                                                {line.productValue} zł
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <div className="-mx-2 flex items-end justify-end">
                                    <div className="flex-grow px-2 lg:max-w-xs">
                                        <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">Discount code</label>
                                        <div>
                                            <input className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="XXXXXX" type="text" />
                                        </div>
                                    </div>
                                    <div className="px-2">
                                        <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">APPLY</button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                                <div className="w-full flex mb-3 items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Produkty</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">{order.orderValue} zł</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Podatki</span>
                                    </div>
                                    <div className="pl-3">
                                        <span className="font-semibold">0 zł</span>
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Dostawa</span>
                                    </div>
                                    <div className="pl-3">
                                        {order.orderValue > 50 ?(
                                            <span className="font-semibold">0 zł</span>
                                        ):(
                                        <span className="font-semibold">11.99 zł</span>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                                <div className="w-full flex items-center">
                                    <div className="flex-grow">
                                        <span className="text-gray-600">Całość</span>
                                    </div>
                                    <div className="pl-3">
                                    {order.orderValue > 50 ?(
                                           <span className="font-semibold">{order.orderValue} zł</span>
                                        ):(
                                            <span className="font-semibold">{order.orderValue + 11.99} zł</span>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 md:w-5/12">

                            {jwt && auth.user.addresses !== null ? (
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                    <div className="w-full mb-3">
                                        <span className="text-gray-600 font-semibold">Wybierz zapisany adres</span>
                                        <select
                                            className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                            onChange={handleAddressChange}
                                        >
                                            <option value="">-- Wybierz adres --</option>
                                            {addresses.map((address) => (
                                                <option key={address.id} value={address.id}>
                                                    {address.firstName} {address.lastName}, {address.streetAddress}, {address.city}, {address.zipCode}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-full flex mb-3 items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Imię i nazwisko</span>
                                        </div>
                                        <div>
                                            <input
                                                className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                                placeholder="Imie i Nazwisko"
                                                type="text"
                                                value={selectedAddress ? `${selectedAddress.firstName} ${selectedAddress.lastName}` : ''}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Miasto</span>
                                        </div>
                                        <div>
                                            <input
                                                className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                                type="text"
                                                value={selectedAddress ? selectedAddress.city : ''}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Ulica</span>
                                        </div>
                                        <div>
                                            <input
                                                className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                                type="text"
                                                value={selectedAddress ? selectedAddress.streetAddress : ''}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Kod pocztowy</span>
                                        </div>
                                        <div>
                                            <input
                                                className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                                type="text"
                                                value={selectedAddress ? selectedAddress.zipCode : ''}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Telefon</span>
                                        </div>
                                        <div>
                                            <input
                                                className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                                                type="text"
                                                value={selectedAddress ? selectedAddress.mobile : ''}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
                                    <div className="w-full flex mb-3 items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Dane</span>
                                        </div>
                                        <div>
                                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="Imie i Nazwisko" type="text" />
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Miasto</span>
                                        </div>
                                        <div>
                                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Ulica</span>
                                        </div>
                                        <div>
                                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Numer domu / mieszkania</span>
                                        </div>
                                        <div>
                                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center">
                                        <div className="w-32">
                                            <span className="text-gray-600 font-semibold">Kod pocztowy</span>
                                        </div>
                                        <div>
                                            <input className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" />
                                        </div>
                                    </div>
                                </div>
                            )}



                            <div>
                                <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"><i className="mdi mdi-lock-outline mr-1"></i> ZAPŁAĆ </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>




    )
};
export default OrderCheckout;