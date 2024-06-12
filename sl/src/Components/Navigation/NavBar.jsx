
import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon, XMarkIcon, XCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline'

import OrderServiceInstance from '../../Services/OrderService'

import ShoppingCard from '../Order/ShoppingCard';
import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import AuthModal from '../Auth/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../../Auth/Action';

const navigation = {

  pages: [
    { name: 'Gumy', href: '/Gumy' },
    { name: 'Twarde', href: '/Twarde' },
    { name: 'Zestawy', href: '/Zestawy' },
    { name: 'Akcesoria', href: '/Akcesoria' },
    { name: 'Wszystko', href: '/Wszystko' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  const [open, setOpen] = useState(false)

  const [order, setOrder] = useState();
  const [isShoppingCardOpen, setIsShoppingCardOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [openUserMenu, setOpenUserMenu] = useState(null);
  const userMenu = Boolean(openUserMenu);

  const jwt = localStorage.getItem("jwt");
  const {auth} = useSelector((store)=>store) 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => {
    setOpenLogin(false)
    
  };

  const handleUserMenuClick = (event) => {
    setOpenUserMenu(event.currentTarget);
  }

  const handleCloseUserMenu = (event) => {
    setOpenUserMenu(null);
  }

  useEffect(() => {
    if (localStorage.getItem('orderId')) {
      getOrderById(localStorage.getItem('orderId'));
      CartLenght();
    }
  }, [localStorage.getItem('orderId')]);

  const getOrderById = (id) => {
    OrderServiceInstance.getOrderById(localStorage.getItem('orderId'))
      .then((response) => {
        console.log(response.data);
        setOrder(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CartLenght = () => {
    if (order != null) {
      return (
        <span className="ml-2 text-sm font-semibold text-gray-700 group-hover:text-gray-800">{order.lines.length}</span>
      )
    } else {
      return (
        <span className="ml-2 text-sm font-semibold text-gray-700 group-hover:text-gray-800">0</span>
      )
    }
  }
  const handleClearOrder = () => {

    if (localStorage.getItem('orderId')) {

      OrderServiceInstance.deleteOrder(localStorage.getItem('orderId'))
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.removeItem('orderId')
      navigate("/")
    }
  };

  const openShoppingCart = () => {
    if (order != null) {
      setIsShoppingCardOpen(true)
    }
  }


  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, dispatch])


  useEffect(() => {
    if (auth.user) {
      handleCloseLogin()
    }
  }, [auth.user])

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  } 
  const navigateToAddresses = () =>{
    navigate("/adresy");
  }
  const navigateToMyOrders = () =>{
    navigate("/moje-zamówienia")
  }

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gradient-to-b pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>



                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-semibold text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Button
                      className="text-sm font-semibold text-gray-700 hover:text-gray-800"
                      onClick={handleOpenLogin}>
                      LOGOWANIE
                    </Button>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flag_of_Poland_%28normative%29.svg/250px-Flag_of_Poland_%28normative%29.svg.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-semibold text-gray-900 ">ZŁ</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-green-600 px-4 text-sm font-semibold text-white sm:px-6 lg:px-8">
          Darmowa dostawa od 50 zł
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://i.ibb.co/G341bxN/slLOGO.png"
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-semibold text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!auth.user?.name ? (
                    <Button
                      className="text-sm font-semibold text-gray-700 hover:text-gray-800"
                      onClick={handleOpenLogin}>
                      LOGOWANIE
                    </Button>
                  ) : (
                    <div>
                    <Avatar
                      className="text-white"
                      onClick={handleUserMenuClick}
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      sx={{
                        bgcolor: 'green',
                        color: 'white',
                        cursor: 'pointer',
                      }}
                    >
                      {auth.user?.name[0].toUpperCase()}
                    </Avatar>
                    <Menu
                      id="basic-menu"
                      anchorEl={openUserMenu}
                      open={userMenu}
                      onClose={handleCloseUserMenu}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={navigateToMyOrders}> Moje zamówienia </MenuItem>
                      <MenuItem onClick={navigateToAddresses} > Adresy </MenuItem>
                      <MenuItem onClick={handleLogout}> WYLOGUJ </MenuItem>
                    </Menu>
                  </div>
                )} 
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Flag_of_Poland_%28normative%29.svg/250px-Flag_of_Poland_%28normative%29.svg.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-semibold">ZŁ</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>



                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    {localStorage.getItem('orderId') && <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                      onClick={openShoppingCart}
                    />}
                    {isShoppingCardOpen && order !== null && <ShoppingCard order={order} isOpen={isShoppingCardOpen} />}
                    {/* <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItems.length}</span> */}
                    {localStorage.getItem('orderId') && <CartLenght />}
                    <span className="sr-only">items in cart, view bag</span>


                  </a>

                </div>
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to="/order"

                  >
                    {localStorage.getItem('orderId') && <ArrowRightCircleIcon
                    />}
                  </Link>


                  <a href="" className="group -m-2 flex items-center p-2">
                    {localStorage.getItem('orderId') && <XCircleIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                      onClick={() => handleClearOrder()}
                    />}
                  </a>
                </div>

              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal handleClose={handleCloseLogin} open={openLogin} />
    </div>
  )
}
