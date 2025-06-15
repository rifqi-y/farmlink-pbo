import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexKategori = () => {
  const [kategoriList, setKategoriList] = useState([]);
  const [formData, setFormData] = useState({ nama: '' });
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/kategori');
      setKategoriList(res.data);
    } catch (error) {
      console.error('Gagal fetch kategori:', error);
    }
  };

  const handleAdd = () => {
    setFormData({ nama: '' });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (kategori) => {
    setFormData({ nama: kategori.nama });
    setSelectedId(kategori.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowDeleteModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/api/kategori/${selectedId}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/kategori', formData);
      }
      setShowModal(false);
      fetchKategori();
    } catch (error) {
      console.error('Gagal simpan kategori:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/kategori/${selectedId}`);
      setShowDeleteModal(false);
      fetchKategori();
    } catch (error) {
      console.error('Gagal hapus kategori:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AdminHeader />
        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <button className="btn btn-primary" onClick={handleAdd}>
            Tambah Kategori
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '5%' }}>ID</th>
                <th>Nama Kategori</th>
                <th style={{ width: '15%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kategoriList.map((kategori) => (
                <tr key={kategori.id}>
                  <td>{kategori.id}</td>
                  <td>{kategori.nama}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(kategori)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(kategori.id)}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">
                    {editMode ? 'Edit Kategori' : 'Tambah Kategori'}
                  </h5>
                  <button className="close text-dark" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama Kategori</label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan nama kategori"
                      />
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
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">Konfirmasi Hapus</h5>
                  <button className="close text-dark" onClick={() => setShowDeleteModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Yakin ingin menghapus kategori ini?</p>
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

export default IndexKategori;
