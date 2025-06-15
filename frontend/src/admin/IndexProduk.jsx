import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexProduk = () => {
  const [produkList, setProdukList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
    sellerId: ''
  });

  useEffect(() => {
    fetchProduk();
    fetchKategori();
    fetchUsers();
  }, []);

  const fetchProduk = async () => {
    const res = await axios.get('http://localhost:8080/api/produk');
    setProdukList(res.data);
  };

  const fetchKategori = async () => {
    const res = await axios.get('http://localhost:8080/api/kategori');
    setKategoriList(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8080/api/users');
    setUserList(res.data);
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      imageUrl: '',
      categoryId: '',
      sellerId: ''
    });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (produk) => {
    setFormData({
      name: produk.name,
      description: produk.description,
      price: produk.price,
      stock: produk.stock,
      imageUrl: produk.imageUrl,
      categoryId: produk.category?.id || '',
      sellerId: produk.seller?.id || ''
    });
    setSelectedId(produk.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (produk) => {
    setSelectedId(produk.id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await axios.delete(`http://localhost:8080/api/produk/${selectedId}`);
    setShowDeleteModal(false);
    fetchProduk();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImage = new FormData();
    formDataImage.append("file", file);

    try {
      const res = await axios.post('http://localhost:8080/api/upload', formDataImage, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData((prev) => ({
        ...prev,
        imageUrl: res.data.imageUrl || res.data.url || res.data
      }));
    } catch (err) {
      console.error("Upload gagal", err);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      imageUrl: formData.imageUrl,
      category: { id: parseInt(formData.categoryId) },
      seller: { id: parseInt(formData.sellerId) }
    };

    if (editMode) {
      await axios.put(`http://localhost:8080/api/produk/${selectedId}`, payload);
    } else {
      await axios.post(`http://localhost:8080/api/produk`, payload);
    }

    setShowModal(false);
    fetchProduk();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AdminHeader />
        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <button className="btn btn-primary" onClick={handleAdd}>Tambah Produk</button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Seller</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produkList.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.category?.nama}</td>
                  <td>{`Rp ${p.price?.toLocaleString('id-ID')}`}</td>
                  <td>{p.stock}</td>
                  <td>{p.seller?.name}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>{editMode ? 'Edit Produk' : 'Tambah Produk'}</h5>
                  <button className="close" onClick={() => setShowModal(false)}><span>&times;</span></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama Produk</label>
                      <input name="name" value={formData.name} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Deskripsi</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Harga</label>
                      <input name="price" type="number" value={formData.price} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Stok</label>
                      <input name="stock" type="number" value={formData.stock} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Gambar Produk</label>
                      <input type="file" className="form-control" onChange={handleFileChange} />
                      {formData.imageUrl && (
                        <img src={formData.imageUrl} alt="preview" style={{ height: 100, marginTop: 10 }} />
                      )}
                    </div>
                    <div className="form-group">
                      <label>Kategori</label>
                      <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="form-control">
                        <option value="">Pilih kategori</option>
                        {kategoriList.map((k) => (
                          <option key={k.id} value={k.id}>{k.nama}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Seller</label>
                      <select name="sellerId" value={formData.sellerId} onChange={handleChange} className="form-control">
                        <option value="">Pilih seller</option>
                        {userList.map((u) => (
                          <option key={u.id} value={u.id}>{u.name}</option>
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

        {/* Modal Konfirmasi Hapus */}
        {showDeleteModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Konfirmasi Hapus</h5>
                  <button className="close" onClick={() => setShowDeleteModal(false)}><span>&times;</span></button>
                </div>
                <div className="modal-body">
                  <p>Apakah yakin ingin menghapus produk ini?</p>
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

export default IndexProduk;