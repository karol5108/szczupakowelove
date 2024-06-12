import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../State/store';
import UserServiceInstance from '../../Services/UserService';

const UserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);

    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector((store)=>store) 

    const [loading, setLoading] = useState(true);

   
    useEffect(() => {
        if (jwt && auth.user) {
            setLoading(true);
            UserServiceInstance.getOrdersByUserId(auth.user.id)
                .then((response) => {
                    setOrders(response.data);
                    console.log(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    setOrders([]);
                    setLoading(false);
                });
        }
    }, [jwt, auth.user]);

    const getStatusClasses = (status) => {
        switch (status) {
            case 'W TRAKCIE':
                return 'text-red-500 bg-red-500';
            case 'OCZEKUJE NA WYSYŁKE':
                return 'text-gray-500 bg-gray-500';
            case 'WYSŁANE':
                return 'text-orange-500 bg-orange-500';
            case 'ODEBRANY':
                return 'text-green-500 bg-green-500';
            default:
                return 'text-gray-500 bg-gray-500';
        }
    };



    const [sortCriteria, setSortCriteria] = useState('id'); // Domyślnie sortujemy według ID

    const sortOrders = (orders, criteria) => {
        switch (criteria) {
            case 'date +':
                return [...orders].sort((a, b) => new Date(a.createDate) - new Date(b.createDate));
            case 'date -':
                return [...orders].sort((a, b) => new Date(b.createDate) - new Date(a.createDate));    
            case 'price +':
                return [...orders].sort((a, b) => a.orderValue - b.orderValue);
            case 'price -':
                return [...orders].sort((a, b) => b.orderValue - a.orderValue);
            case 'status':
                return [...orders].sort((a, b) => a.status.localeCompare(b.status));
            case 'id':
            default:
                return [...orders].sort((a, b) => a.id - b.id);
        }
    };
    const sortedOrders = sortOrders(orders, sortCriteria);

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!auth.user || loading) {
        return <div>Loading user data...</div>;
    }
    return (
        <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-gray-600 font-semibold">Historia zamówień</h2>
                    <span className="text-xs">{auth.user.email}</span>
                </div>
                <div>
                    <select
                        onChange={(e) => setSortCriteria(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1"
                        value={sortCriteria}
                    >
                        <option value="id">Sortuj według ID</option>
                        <option value="date +">Sortuj według daty rosnąco</option>
                        <option value="date -">Sortuj według daty malejąco</option>
                        <option value="price +">Sortuj według ceny rosnąco</option>
                        <option value="price -">Sortuj według ceny malejąco</option>
                        <option value="status">Sortuj według statusu</option>
                    </select>
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">PRODUKTY</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ILOŚĆ SZTUK</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">WARTOŚĆ</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DATA</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map(order => (
                                <tr key={order.id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{order.id}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            {order.lines.map((line) => (
                                                <div key={line.id} className="flex-shrink-0 w-10 h-10">
                                                    <a href={`/info/${line.product.id}`}>
                                                        <img className="w-full h-full rounded-full" 
                                                            src={`/${line.product.name}/${line.color}.jpg`} 
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{order.lines.length}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{order.orderValue}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{new Date(order.createDate).toLocaleDateString()}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className='relative inline-block px-3 py-1 font-semibold leading-tight text-gray-900'>
                                            <span aria-hidden className={`absolute inset-0 ${getStatusClasses(order.status).split(' ')[1]} opacity-50 rounded-full`}></span>
                                            <span className="relative">{order.status}</span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                        <span className="text-xs xs:text-sm text-gray-900">
                            Wyświetlane {indexOfFirstOrder + 1} do {Math.min(indexOfLastOrder, orders.length)} z {orders.length} wyników
                        </span>
                        <div className="inline-flex mt-2 xs:mt-0">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-green-600 font-semibold py-2 px-4 rounded-l"
                                disabled={currentPage === 1}
                            >
                                Poprzednia
                            </button>
                            &nbsp; &nbsp;
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-green-600 font-semibold py-2 px-4 rounded-r"
                                disabled={indexOfLastOrder >= orders.length}
                            >
                                Następna
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserOrders;
