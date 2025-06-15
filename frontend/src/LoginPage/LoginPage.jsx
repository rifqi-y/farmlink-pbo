import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../LoginPage/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', loginData);
      console.log('Login berhasil:', res.data);
      // Simpan user ke localStorage/session, redirect ke dashboard
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/admin'); // atau redirect ke dashboard
    } catch (err) {
      alert('Login gagal: ' + (err.response?.data || 'Server error'));
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', registerData);
      alert('Registrasi berhasil!');
      document.getElementById('reg-log').checked = false; // Kembali ke login
    } catch (err) {
      alert('Registrasi gagal: ' + (err.response?.data || 'Server error'));
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="logo-container mb-3">
              <Link to="/">
                <img src="/assets/img/logo.png" alt="logo" style={{ width: '25%' }} />
              </Link>
            </div>

            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log" />
              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">

                  {/* === LOGIN === */}
                  <div className="card-front">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Log In</h4>
                        <div className="form-group">
                          <input
                            type="email" name="email" className="form-style" placeholder="Your Email"
                            value={loginData.email} onChange={handleLoginChange}
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password" name="password" className="form-style" placeholder="Your Password"
                            value={loginData.password} onChange={handleLoginChange}
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        <button className="btn mt-4" onClick={handleLogin}>Submit</button>
                        <p className="mb-0 mt-3 text-center">
                          <span className="small-text">Belum punya akun? Aktifkan <label htmlFor="reg-log" className="link">Sign Up</label></span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* === REGISTER === */}
                  <div className="card-back">
                    <div className="center-wrap">
                      <div className="section text-center">
                        <h4 className="mb-4 pb-3">Sign Up</h4>
                        <div className="form-group">
                          <input
                            type="text" name="name" className="form-style" placeholder="Your Full Name"
                            value={registerData.name} onChange={handleRegisterChange}
                          />
                          <i className="input-icon uil uil-user" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="email" name="email" className="form-style" placeholder="Your Email"
                            value={registerData.email} onChange={handleRegisterChange}
                          />
                          <i className="input-icon uil uil-at" />
                        </div>
                        <div className="form-group mt-2">
                          <input
                            type="password" name="password" className="form-style" placeholder="Your Password"
                            value={registerData.password} onChange={handleRegisterChange}
                          />
                          <i className="input-icon uil uil-lock-alt" />
                        </div>
                        <button className="btn mt-4" onClick={handleRegister}>Submit</button>
                      </div>
                    </div>
                  </div>

                </div>
              </div> {/* end card-3d-wrapper */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
