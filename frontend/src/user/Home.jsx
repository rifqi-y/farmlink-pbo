import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import UserFooter from '../components/UserFooter';
import UserPreLoader from '../components/UserPreLoader';
import Slider from "react-slick";
import axios from 'axios';

const Home = () => {
  const [produkList, setProdukList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/produk');
      setProdukList(res.data.slice(0, 3)); // ambil 3 produk saja
    } catch (err) {
      console.error('Gagal ambil produk:', err);
    }
  };

  const handleAddToCart = (produk) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    // TODO: Implementasi add to cart via API/localStorage
    alert(`Produk ${produk.name} ditambahkan ke keranjang`);
  };
  
  return (
    <div>
      <UserPreLoader></UserPreLoader>
      <UserHeader></UserHeader>

      {/* <!-- hero area --> */}
      <div className="breadcrumb-section hero-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 offset-lg-2 text-center">
              <div className="hero-text">
                <div className="hero-text-tablecell">
                  <p className="subtitle">Fresh & Organic</p>
                  <h1>Delicious Seasonal Fruits</h1>
                  <div className="hero-btns">
                    <Link to='/shop' className="boxed-btn">Shop Now</Link>
                    <Link to='/contact' className='bordered-btn'>Contact Us</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end hero area --> */}

      {/* <!-- features list section --> */}
      <div className="list-section pt-80 pb-80">
        <div className="container">

          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div className="content">
                  <h3>Free Shipping</h3>
                  <p>When order over $75</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div className="list-box d-flex align-items-center">
                <div className="list-icon">
                  <i className="fas fa-phone-volume"></i>
                </div>
                <div className="content">
                  <h3>24/7 Support</h3>
                  <p>Get support all day</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="list-box d-flex justify-content-start align-items-center">
                <div className="list-icon">
                  <i className="fas fa-sync"></i>
                </div>
                <div className="content">
                  <h3>Refund</h3>
                  <p>Get refund within 3 days!</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <!-- end features list section --> */}
      
      {/* <!-- cart banner section --> */}
      <section className="cart-banner pt-100 pb-100">
          <div className="container">
              <div className="row clearfix">
                  {/* <!--Image Column--> */}
                  <div className="image-column col-lg-6">
                      <div className="image">
                          <div className="price-box">
                              <div className="inner-price">
                                    <span className="price">
                                        <strong>30%</strong> <br/> off per kg
                                    </span>
                                </div>
                            </div>
                          <img src="assets/img/a.jpg" alt="" />
                        </div>
                    </div>
                    {/* <!--Content Column--> */}
                    <div className="content-column col-lg-6">
                        <h3><span className="orange-text">Deal</span> of the month</h3>
                        <h4>Hikan Strwaberry</h4>
                        <div className="text">Quisquam minus maiores repudiandae nobis, minima saepe id, fugit ullam similique! Beatae, minima quisquam molestias facere ea. Perspiciatis unde omnis iste natus error sit voluptatem accusant</div>
                        {/* <!--Countdown Timer--> */}
                        <div className="time-counter"><div className="time-countdown clearfix" data-countdown="2020/2/01"><div className="counter-column"><div className="inner"><span className="count">00</span>Days</div></div> <div className="counter-column"><div className="inner"><span className="count">00</span>Hours</div></div>  <div className="counter-column"><div className="inner"><span className="count">00</span>Mins</div></div>  <div className="counter-column"><div className="inner"><span className="count">00</span>Secs</div></div></div></div>
                        <Link to="/cart" className="cart-btn">
                          <i className="fas fa-shopping-cart"></i> Add to Cart
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- end cart banner section --> */}

        {/* <!-- shop banner --> */}
        <section className="shop-banner">
            <div className="container">
                <h3>December sale is on! <br/> with big <span className="orange-text">Discount...</span></h3>
                  <div className="sale-percent"><span>Sale! <br/> Upto</span>50% <span>off</span></div>
                  <Link to='/shop' className="cart-btn btn-lg">
                    Shop Now
                  </Link>
              </div>
          </section>
        {/* <!-- end shop banner --> */}

        {/* === OUR PRODUCTS SECTION === */}
      <div className="product-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-title">
                <h3><span className="orange-text">Our</span> Products</h3>
                <p>Produk terbaik dan segar langsung dari petani lokal untuk Anda.</p>
              </div>
            </div>
          </div>

          <div className="row">
            {produkList.length > 0 ? (
              produkList.map((produk) => (
                <div key={produk.id} className="col-lg-4 col-md-6 text-center">
                  <div className="single-product-item">
                    <div className="product-image">
                      <Link to='/single-product'>
                        <img src={produk.imageUrl || "assets/img/products/product-img-1.jpg"} alt={produk.name} />
                      </Link>
                    </div>
                    <h3>{produk.name}</h3>
                    <p className="product-price"><span>Per Kg</span> Rp {produk.price?.toLocaleString('id-ID')}</p>
                    <Link
                      to="#"
                      className="boxed-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(produk);
                      }}
                    >
                      <i className="fas fa-shopping-cart"></i> Add to Cart
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>Produk belum tersedia</p>
              </div>
            )}
          </div>
        </div>
      </div>

        {/* <!-- logo carousel --> */}
        <div className="logo-carousel-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Slider
                  slidesToShow={5}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={2000}
                  infinite={true}
                  arrows={false}
                  responsive={[
                    {
                      breakpoint: 1024,
                      settings: { slidesToShow: 3 }
                    },
                    {
                      breakpoint: 768,
                      settings: { slidesToShow: 2 }
                    },
                    {
                      breakpoint: 480,
                      settings: { slidesToShow: 1 }
                    }
                  ]}
                >
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                  <div className="single-logo-item">
                    <img src="assets/img/logo.png" alt="" />
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- end logo carousel --> */}

        <UserFooter></UserFooter>

    </div>
  );
};

export default Home;
