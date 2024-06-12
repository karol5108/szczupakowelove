import {React, useEffect, useState} from 'react'
import UserServiceInstance from '../../Services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../State/store';
export const Addresses = () => {
    const [newAddressData, setNewAddressData] = useState({ firstname: '', lastName: '', streetAddress: '', city: '', zipCode: '', mobile: '' });
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector((store)=>store) 

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddressData({ ...newAddressData, [name]: value });
      };

      const handleNewAddressSubmit = (e) => {
        e.preventDefault();
        UserServiceInstance.addNewAddress(auth.user.id, newAddressData)
        console.log("adres dodany : ", newAddressData)
      }

    const saveAddress = () =>{

    }

    return (
        <div className="flex bg-gray-100">
            <div className="m-auto">
                <div>
                    
                    <div className="mt-5 bg-white rounded-lg shadow">
                        <div className="flex">
                            <div className="flex-1 py-5 pl-5 overflow-hidden">
                                <svg className="inline align-text-top" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                    <g>
                                        <path d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z" fill="none" id="svg_1" stroke="null"></path>
                                        <path d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z" id="svg_2"></path>
                                        <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3"></circle>
                                    </g>
                                </svg>
                                <h1 className="inline text-2xl font-semibold leading-none">DANE DO WYSYŁKI</h1>
                            </div>
                        </div>
                        <div className="px-5 pb-5">
                            <input placeholder="Imię"
                                   className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                   name='firstName'
                                   id='firstName' 
                                   onChange={handleAddressChange}>
                            </input>

                            <input placeholder="Nazwisko"
                                   className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                   name='lastName'
                                   id='lastName' 
                                   onChange={handleAddressChange}>
                            </input>


                            <input placeholder="Miasto"
                                   className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                   name='city'
                                   id='city' 
                                   onChange={handleAddressChange}>
                            </input>

                            <input placeholder="Ulica"
                                   className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                   name='streetAddress'
                                   id='streetAddress' 
                                   onChange={handleAddressChange}>
                            </input>

                            <input placeholder="Telefon"
                                   className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                   name='mobile'
                                   id='mobile' 
                                   onChange={handleAddressChange}>
                            </input>

                            <input placeholder="Kod pocztowy"
                                   className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                   name='zip'
                                   id='zip'
                                   type="number"  
                                   pattern='[0-9]*'
                                   max="99999"
                                   onChange={handleAddressChange}>
                            </input>

                            <button type="button" 
                                    className="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out"
                                    onClick={handleNewAddressSubmit}>                       

                                <span className="pl-2 mx-1">ZAPISZ NOWY ADRES</span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
