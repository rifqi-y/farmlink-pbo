import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexPromo = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [promoList, setPromoList] = useState([]);
  const [produkList, setProdukList] = useState([]);
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    diskon: '',
    masaBerlaku: '',
    produkId: ''
  });

  useEffect(() => {
    fetchPromo();
    fetchProduk();
  }, []);

  const fetchPromo = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/promo');
      console.log('Response promo:', res.data); // 👈 Debug
      const data = Array.isArray(res.data) ? res.data : []; // ✅ Perlindungan jika bukan array
      setPromoList(data);
    } catch (err) {
      console.error('Gagal memuat data promo:', err);
      setPromoList([]);
    }
  };

  const fetchProduk = async () => {
    const res = await axios.get('http://localhost:8080/api/produk');
    setProdukList(res.data);
  };

  const handleAdd = () => {
    setEditMode(false);
    setSelectedPromo(null);
    setFormData({ nama: '', deskripsi: '', diskon: '', masaBerlaku: '', produkId: '' });
    setShowModal(true);
  };

  const handleEdit = (promo) => {
    setEditMode(true);
    setSelectedPromo(promo);
    setFormData({
      nama: promo.nama,
      deskripsi: promo.deskripsi,
      diskon: promo.diskon,
      masaBerlaku: promo.masaBerlaku,
      produkId: promo.produk?.id || ''
    });
    setShowModal(true);
  };

  const handleDelete = (promo) => {
    setSelectedPromo(promo);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await axios.delete(`http://localhost:8080/api/promo/${selectedPromo.id}`);
    setShowDeleteModal(false);
    fetchPromo();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      nama: formData.nama,
      deskripsi: formData.deskripsi,
      diskon: parseFloat(formData.diskon),
      masaBerlaku: formData.masaBerlaku,
      produk: { id: parseInt(formData.produkId) }
    };

    if (editMode) {
      await axios.put(`http://localhost:8080/api/promo/${selectedPromo.id}`, payload);
    } else {
      await axios.post('http://localhost:8080/api/promo', payload);
    }

    setShowModal(false);
    fetchPromo();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AdminHeader />

        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <button className="btn btn-primary" onClick={handleAdd}>Tambah Promo</button>
        </div>

        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <table className="table table-hover table-striped table-bordered shadow-sm rounded" style={{ minWidth: '700px' }}>
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nama Promo</th>
                <th>Deskripsi</th>
                <th>Diskon (%)</th>
                <th>Masa Berlaku</th>
                <th>Produk</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(promoList) && promoList.length > 0 ? (
                promoList.map(promo => (
                  <tr key={promo.id}>
                    <td>{promo.id}</td>
                    <td>{promo.nama}</td>
                    <td>{promo.deskripsi}</td>
                    <td>{promo.diskon}</td>
                    <td>{promo.masaBerlaku}</td>
                    <td>{promo.produk?.name}</td>
                    <td className="d-flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(promo)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(promo)}>Hapus</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">Tidak ada data promo.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">{editMode ? 'Edit Promo' : 'Tambah Promo'}</h5>
                  <button type="button" className="close text-dark" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama Promo</label>
                      <input type="text" name="nama" className="form-control" value={formData.nama} onChange={handleChange} placeholder="Masukkan nama promo" />
                    </div>
                    <div className="form-group">
                      <label>Deskripsi</label>
                      <textarea name="deskripsi" className="form-control" rows="3" value={formData.deskripsi} onChange={handleChange} placeholder="Masukkan deskripsi promo" />
                    </div>
                    <div className="form-group">
                      <label>Diskon (%)</label>
                      <input type="number" name="diskon" className="form-control" value={formData.diskon} onChange={handleChange} placeholder="Masukkan persentase diskon" />
                    </div>
                    <div className="form-group">
                      <label>Masa Berlaku</label>
                      <input type="text" name="masaBerlaku" className="form-control" value={formData.masaBerlaku} onChange={handleChange} placeholder="Contoh: 01 Juni - 30 Juni" />
                    </div>
                    <div className="form-group">
                      <label>Produk</label>
                      <select name="produkId" className="form-control" value={formData.produkId} onChange={handleChange}>
                        <option value="">Pilih Produk</option>
                        {produkList.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                  <button className="btn btn-success" onClick={handleSubmit}>Simpan</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">Konfirmasi Hapus</h5>
                  <button type="button" className="close text-dark" onClick={() => setShowDeleteModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Apakah Anda yakin ingin menghapus promo ini?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Batal</button>
                  <button className="btn btn-danger" onClick={confirmDelete}>Hapus</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPromo;
