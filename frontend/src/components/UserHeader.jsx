import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';
import axios from 'axios';

const UserHeader = () => {
  const [cartCount, setCartCount] = useState(0);
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:8080/api/cart/count/${user.id}`)
        .then((res) => {
          setCartCount(res.data);
        })
        .catch((err) => {
          console.error('Gagal mengambil jumlah cart:', err);
        });
    }
  }, [user]);

  return (
    <div>
      {/* Header */}
      <div className="top-header-area" id="sticker">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-sm-12 text-center">
              <div className="main-menu-wrap">
                {/* Logo */}
                <div className="site-logo">
                  <Link to='/'>
                    <img src="assets/img/logo.png" alt="logo" />
                  </Link>
                </div>
                {/* End Logo */}

                {/* Menu Start */}
                <nav className="main-menu">
                  <ul>
                    <li className="current-list-item">
                      <Link to='/'>Home</Link>
                    </li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/contact'>Contact</Link></li>
                    <li><Link to='/shop'>Shop</Link></li>
                    <li>
                      <div className="header-icons position-relative">
                        <Link className="shopping-cart position-relative mr-5" to="/cart">
                          <i className="fas fa-shopping-cart"></i>
                          {cartCount > 0 && (
                            <span
                              style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-10px',
                                background: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                fontSize: '10px',
                                width: '18px',
                                height: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold'
                              }}
                            >
                              {cartCount}
                            </span>
                          )}
                        </Link>
                        {user ? (
                          <>
                            <Link to="/profile" className="boxed-btn">Profil</Link>
                            <Link
                              to="/"
                              className="boxed-btn ml-2"
                              onClick={() => {
                                logout();
                              }}
                            >
                              Logout
                            </Link>
                          </>
                        ) : (
                          <Link to="/login" className="boxed-btn">Login</Link>
                        )}
                      </div>
                    </li>
                  </ul>
                </nav>
                {/* End Menu */}

                <a className="mobile-show search-bar-icon" href="#"><i className="fas fa-search"></i></a>
                <div className="mobile-menu"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Header */}
    </div>
  );
};

export default UserHeader;
