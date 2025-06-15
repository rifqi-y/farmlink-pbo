import React from 'react'
import { Link } from 'react-router-dom';
import '../LoginPage/LoginPage.css'

const LoginPage = () => {
  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">

              {/* Tempat logo di sini */}
              <div className="logo-container">
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
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                            <i className="input-icon uil uil-at" />
                          </div>	
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" />
                            <i className="input-icon uil uil-lock-alt" />
                          </div>
                            <a href="#" className="btn mt-4">submit</a>
                            <p className="mb-0 mt-3 text-center">
                              <span className="small-text">Belum punya akun? Aktifkan <label htmlFor="reg-log" className="link">Sign Up</label></span>
                            </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input type="text" name="logname" className="form-style" placeholder="Your Full Name" id="logname" autoComplete="off" />
                            <i className="input-icon uil uil-user" />
                          </div>	
                          <div className="form-group mt-2">
                            <input type="email" name="logemail" className="form-style" placeholder="Your Email" id="logemail" autoComplete="off" />
                            <i className="input-icon uil uil-at" />
                          </div>	
                          <div className="form-group mt-2">
                            <input type="password" name="logpass" className="form-style" placeholder="Your Password" id="logpass" autoComplete="off" />
                            <i className="input-icon uil uil-lock-alt" />
                          </div>
                          <a href="#" className="btn mt-4">submit</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> {/* card-3d-wrap */}
              </div> {/* section login/signup */}
            </div> {/* col-12 */}
          </div> {/* row */}
        </div> {/* container */}
      </div> {/* section */}
    </div>
  )
}

export default LoginPage
