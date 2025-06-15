import React, { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader';
import UserFooter from '../components/UserFooter';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ nama: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const transaksi = [
    {
      id: 1,
      tanggal: '2025-06-01',
      total: 'Rp 150.000',
      status: 'Selesai',
      items: [
        { nama: 'Pupuk Organik', jumlah: 2, harga: 'Rp 50.000' },
        { nama: 'Bibit Jagung', jumlah: 1, harga: 'Rp 50.000' }
      ]
    },
    {
      id: 2,
      tanggal: '2025-06-05',
      total: 'Rp 90.000',
      status: 'Dibayar',
      items: [
        { nama: 'Pupuk Kompos', jumlah: 3, harga: 'Rp 30.000' }
      ]
    },
    {
      id: 3,
      tanggal: '2025-06-10',
      total: 'Rp 200.000',
      status: 'Pending',
      items: [
        { nama: 'Pupuk NPK', jumlah: 4, harga: 'Rp 50.000' }
      ]
    }
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData({
        nama: storedUser.name || '',
        email: storedUser.email || '',
        password: storedUser.password || ''
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: formData.nama,
      email: formData.email,
      password: formData.password
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setShowModal(false);
  };

  const handleDetail = (trx) => {
    setSelectedTransaction(trx);
    setShowDetailModal(true);
  };

  if (!user) return <div className="text-center mt-5">Memuat data pengguna...</div>;

  return (
    <div>
      <UserHeader />

      <div className="breadcrumb-section hero-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="hero-text">
                <div className="hero-text-tablecell">
                  <p className="subtitle">Profil Pengguna</p>
                  <h1>Informasi & Transaksi Anda</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-100 mb-100">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm p-4">
              <h4 className="orange-text mb-3">Data Diri</h4>
              <p><strong>Nama:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0">
                  <strong>Password:</strong>{' '}
                  {showPassword ? user.password : '••••••••'}
                </p>
                <button
                  className="btn btn-sm btn-outline-secondary ml-2"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Sembunyikan Password' : 'Lihat Password'}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <a className="boxed-btn mt-3" href="#" onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
                Edit Profil
              </a>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm p-4">
              <h4 className="orange-text mb-4">Riwayat Transaksi</h4>
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>ID</th>
                      <th>Tanggal</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaksi.map((trx) => (
                      <tr key={trx.id}>
                        <td>{trx.id}</td>
                        <td>{trx.tanggal}</td>
                        <td>{trx.total}</td>
                        <td>
                          <span className={`badge ${trx.status === 'Selesai' ? 'badge-success' : trx.status === 'Dibayar' ? 'badge-primary' : 'badge-warning'}`}>
                            {trx.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-info" onClick={() => handleDetail(trx)}>Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <a href="/shop" className="boxed-btn mt-3">Belanja Lagi</a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit Profil */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content shadow">
              <div className="modal-header bg-light text-dark">
                <h5 className="modal-title">Edit Profil</h5>
                <button className="close text-white" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Nama</label>
                    <input type="text" name="nama" className="form-control" value={formData.nama} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary mt-2"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Sembunyikan' : 'Lihat'}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                <button className="btn btn-success" onClick={handleSave}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Transaksi */}
      {showDetailModal && selectedTransaction && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">Detail Transaksi #{selectedTransaction.id}</h5>
                <button className="close text-white" onClick={() => setShowDetailModal(false)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Tanggal:</strong> {selectedTransaction.tanggal}</p>
                <p><strong>Total:</strong> {selectedTransaction.total}</p>
                <p><strong>Status:</strong> {selectedTransaction.status}</p>
                <h6 className="mt-3">Item:</h6>
                <ul>
                  {selectedTransaction.items.map((item, index) => (
                    <li key={index}>{item.nama} - {item.jumlah} x {item.harga}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDetailModal(false)}>Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <UserFooter />
    </div>
  );
};

export default UserProfile;
