

import React from 'react';
import Home from './Component/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import ProductList from './Component/ProductList/ProductList';
import Admin from './Component/Admin/Admin';
import Contact from './Component/Contact/Contact';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import NotFound from './Component/NotFound/NotFound';



const routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "productList", element:(
        <PrivateRoute> <ProductList />
        </PrivateRoute>  ), },
      { path: "admin", element: (
        <PrivateRoute> <Admin/>  </PrivateRoute>
      ),},
      { path: "contact", element: <Contact/> },
      { path: "*", element: <NotFound/> },
     
      
   
    ]
  }
]);
export default function App() {
  return (
    <RouterProvider router={routers}></RouterProvider>
    
  )
}

