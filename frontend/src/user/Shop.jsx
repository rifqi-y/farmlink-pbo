import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import UserFooter from '../components/UserFooter';
import UserPreLoader from '../components/UserPreLoader';
import Slider from "react-slick";
import axios from 'axios';

const Shop = () => {
  const [kategoriList, setKategoriList] = useState([]);
  const [produkList, setProdukList] = useState([]);
  const [filterKategori, setFilterKategori] = useState('*');

  useEffect(() => {
    fetchKategori();
    fetchProduk();
  }, []);

  const fetchKategori = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/kategori');
      setKategoriList(res.data);
    } catch (err) {
      console.error('Gagal ambil kategori:', err);
    }
  };

  const fetchProduk = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/produk');
      setProdukList(res.data);
    } catch (err) {
      console.error('Gagal ambil produk:', err);
    }
  };

  const handleFilterChange = (kategori) => {
    setFilterKategori(kategori);
  };

  const handleAddToCart = (produk) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Silakan login terlebih dahulu!');
      window.location.href = '/login';
    } else {
      // Simpan produk ke cart lokal (opsional)
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(produk);
      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href = '/cart';
    }
  };

  const filteredProduk = filterKategori === '*'
    ? produkList
    : produkList.filter(p => p.category?.nama?.toLowerCase() === filterKategori.toLowerCase());

  return (
    <div>
      <UserPreLoader />
      <UserHeader />

      {/* Breadcrumb */}
      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Fresh and Organic</p>
                <h1>Shop</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produk */}
      <div className="product-section mt-150 mb-150">
        <div className="container">

          {/* Filter Kategori */}
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="product-filters">
                <ul>
                  <li className={filterKategori === '*' ? 'active' : ''} onClick={() => handleFilterChange('*')}>All</li>
                  {kategoriList.map(k => (
                    <li
                      key={k.id}
                      className={filterKategori === k.nama.toLowerCase() ? 'active' : ''}
                      onClick={() => handleFilterChange(k.nama.toLowerCase())}
                    >
                      {k.nama}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Produk List */}
          <div className="row product-lists">
            {filteredProduk.length > 0 ? (
              filteredProduk.map(produk => (
                <div key={produk.id} className="col-lg-4 col-md-6 text-center mb-4">
                  <div className="single-product-item">
                    <div className="product-image">
                      <Link to="/single-product">
                        <img src={produk.imageUrl || "assets/img/products/product-img-1.jpg"} alt={produk.name} />
                      </Link>
                    </div>
                    <h3>{produk.name}</h3>
                    <p className="product-price">
                      <span>Per {produk.unit || 'Item'}</span> Rp {produk.price?.toLocaleString('id-ID')}
                    </p>
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
                <p>Produk tidak ditemukan.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logo Carousel */}
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
                  { breakpoint: 1024, settings: { slidesToShow: 3 } },
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 480, settings: { slidesToShow: 1 } }
                ]}
              >
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="single-logo-item">
                    <img src="assets/img/logo.png" alt="logo" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <UserFooter />
    </div>
  );
};

export default Shop;
