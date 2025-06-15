import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './user/Home';
import About from './user/About';
import Page404 from './user/Page404';
import Cart from './user/Cart';
import Checkout from './user/Checkout';
import Contact from './user/Contact';
import Shop from './user/Shop';
import SingleProduct from './user/SingleProduct';
import LoginPage from './LoginPage/LoginPage';
import Dashboard from './admin/Dashboard';
import IndexProduk from './admin/IndexProduk';
import IndexTransaksi from './admin/IndexTransaksi';
import IndexUser from './admin/IndexUser';
import IndexKategori from './admin/IndexKategori';
import IndexPromo from './admin/IndexPromo';
import UserProfile from './user/UserProfile';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import { getCurrentUser } from './utils/auth';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const user = getCurrentUser();

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/404' element={<Page404 />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/single-product' element={<SingleProduct />} />

      {/* Login akan redirect jika sudah login */}
      <Route
        path='/login'
        element={!user ? <LoginPage /> : <Home />}
      />

      {/* Hanya untuk user login */}
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      {/* Admin routes hanya untuk admin */}
      <Route
        path='/admin'
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
      <Route
        path='/admin/produk'
        element={
          <AdminRoute>
            <IndexProduk />
          </AdminRoute>
        }
      />
      <Route
        path='/admin/transaksi'
        element={
          <AdminRoute>
            <IndexTransaksi />
          </AdminRoute>
        }
      />
      <Route
        path='/admin/user'
        element={
          <AdminRoute>
            <IndexUser />
          </AdminRoute>
        }
      />
      <Route
        path='/admin/kategori'
        element={
          <AdminRoute>
            <IndexKategori />
          </AdminRoute>
        }
      />
      <Route
        path='/admin/promo'
        element={
          <AdminRoute>
            <IndexPromo />
          </AdminRoute>
        }
      />

      {/* Not Found */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;
