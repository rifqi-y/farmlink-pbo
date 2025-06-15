import React, { useState } from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexProduk = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAdd = () => {
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (id) => {
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setShowDeleteModal(true);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <AdminHeader />

        <div style={{ paddingTop: '10px'}}>          
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-primary" onClick={handleAdd}>Tambah Produk</button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '5%' }}>ID</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th style={{ width: '15%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Pupuk Organik</td>
                <td>Bahan</td>
                <td>Rp 50.000</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-warning" onClick={() => handleEdit(1)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(1)}>Hapus</button>
                  </div>
                </td>
              </tr>
              {/* Tambahkan produk lainnya di sini */}
            </tbody>
          </table>
        </div>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">{editMode ? 'Edit Produk' : 'Tambah Produk'}</h5>
                  <button type="button" className="close text-dark" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama Produk</label>
                      <input type="text" className="form-control" placeholder="Masukkan nama produk" />
                    </div>
                    <div className="form-group">
                      <label>Kategori</label>
                      <select className="form-control">
                        <option value="bahan">Bahan</option>
                        <option value="hasil">Hasil</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Harga</label>
                      <input type="number" className="form-control" placeholder="Masukkan harga" />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                  <button className="btn btn-success">Simpan</button>
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
                  <button type="button" className="close text-dark" onClick={() => setShowDeleteModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Apakah Anda yakin ingin menghapus produk ini?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Batal</button>
                  <button className="btn btn-danger">Hapus</button>
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
