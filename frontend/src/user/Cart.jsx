import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserHeader from '../components/UserHeader';
import UserFooter from '../components/UserFooter';
import UserPreLoader from '../components/UserPreLoader';
import Slider from 'react-slick';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const SHIPPING_COST = 30000;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      window.location.href = '/login';
    } else {
      fetchCartItems(user.id);
    }
  }, []);

  const fetchCartItems = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/cart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error('Gagal mengambil cart:', err);
    }
  };

  const handleQuantityChange = async (cartId, quantity) => {
    try {
      await axios.put(`http://localhost:8080/api/cart/${cartId}`, { quantity });
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartId ? { ...item, quantity } : item))
      );
    } catch (err) {
      console.error('Gagal update quantity:', err);
    }
  };

  const handleRemove = async (cartId) => {
      try {
        await axios.delete(`http://localhost:8080/api/cart/${cartId}`);
        setCartItems((prev) => prev.filter((item) => item.id !== cartId));
      } catch (err) {
        console.error('Gagal hapus item:', err);
      }
    };

    const handlePlaceOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || cartItems.length === 0) return;

    try {
      const payload = {
        userId: user.id,
        shipping: SHIPPING_COST,
        items: cartItems.map(item => ({
          produkId: item.produk.id,
          quantity: item.quantity,
          subtotal: item.quantity * item.produk.price
        }))
      };

      console.log("Payload transaksi:", payload);
      const res = await axios.post('http://localhost:8080/api/transaksi', payload);

      alert('Transaksi berhasil!');
      setShowModal(false);
      setCartItems([]); // Kosongkan cart di frontend

      // ✅ Optional: redirect ke halaman "riwayat transaksi"
      // navigate('/user/transaksi');
    } catch (err) {
      console.error('Gagal melakukan transaksi:', err);
      alert('Gagal melakukan transaksi.');
    }
  };



  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.produk.price, 0);
  const total = subtotal + (cartItems.length > 0 ? SHIPPING_COST : 0);

  return (
    <div>
      <UserPreLoader />
      <UserHeader />

      <div className="breadcrumb-section breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="breadcrumb-text">
                <p>Fresh and Organic</p>
                <h1>Cart</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="cart-table-wrap">
                <table className="cart-table">
                  <thead className="cart-table-head">
                    <tr className="table-head-row">
                      <th>Image</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <tr key={item.id} className="table-body-row">
                          <td><img src={item.produk.imageUrl || '/assets/img/products/product-img-1.jpg'} alt={item.produk.name} width={70} /></td>
                          <td>{item.produk.name}</td>
                          <td>Rp {item.produk.price.toLocaleString('id-ID')}</td>
                          <td>
                            <input
                              type="number"
                              value={item.quantity}
                              min="1"
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                              style={{ width: '60px' }}
                            />
                          </td>
                          <td>Rp {(item.quantity * item.produk.price).toLocaleString('id-ID')}</td>
                          <td><button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.id)}>Hapus</button></td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6" className="text-center">Keranjang kosong</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="total-section">
                <h4 className="mb-3">Rincian Checkout</h4>
                <ul className="list-group mb-3">
                  {cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{item.produk.name}</strong><br />
                        <small>{item.quantity} x Rp {item.produk.price.toLocaleString('id-ID')}</small>
                      </div>
                      <span>Rp {(item.quantity * item.produk.price).toLocaleString('id-ID')}</span>
                    </li>
                  ))}
                </ul>

                <table className="total-table mb-3">
                  <tbody>
                    <tr className="total-data">
                      <td><strong>Subtotal:</strong></td>
                      <td>Rp {subtotal.toLocaleString('id-ID')}</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Shipping:</strong></td>
                      <td>Rp {SHIPPING_COST.toLocaleString('id-ID')}</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Total:</strong></td>
                      <td>Rp {total.toLocaleString('id-ID')}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="cart-buttons">
                  <button className="boxed-btn black" onClick={() => setShowModal(true)}>
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Konfirmasi Pesanan</h4>
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  <div>{item.produk.name} ({item.quantity}x)</div>
                  <div>Rp {(item.quantity * item.produk.price).toLocaleString('id-ID')}</div>
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> Rp {total.toLocaleString('id-ID')}</p>
            <div className="d-flex justify-content-end">
              <button className="boxed-btn mr-2" onClick={() => setShowModal(false)}>Batal</button>
              <button className="boxed-btn black" onClick={handlePlaceOrder}>Place Order</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 25px;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
        }
      `}</style>

      <div className="logo-carousel-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Slider
                slidesToShow={5}
                slidesToScroll={1}
                autoplay
                autoplaySpeed={2000}
                infinite
                arrows={false}
                responsive={[
                  { breakpoint: 1024, settings: { slidesToShow: 3 } },
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 480, settings: { slidesToShow: 1 } },
                ]}
              >
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="single-logo-item">
                    <img src="/assets/img/logo.png" alt="logo" />
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

export default Cart;
