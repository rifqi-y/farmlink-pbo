import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const IndexUser = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8080/api/users');
    setUsers(res.data);
  };

  const fetchRoles = async () => {
    const res = await axios.get('http://localhost:8080/api/roles');
    setRoles(res.data);
  };

  const handleAdd = () => {
    setFormData({ name: '', email: '', password: '', role: '' });
    setEditMode(false);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role?.id || ''
    });
    setSelectedUser(user);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: {
        id: formData.role
      }
    };

    if (editMode) {
      await axios.put(`http://localhost:8080/api/users/${selectedUser.id}`, payload);
    } else {
      await axios.post('http://localhost:8080/api/users', payload);
    }

    setShowModal(false);
    fetchUsers();
  };

  const confirmDelete = async () => {
    await axios.delete(`http://localhost:8080/api/users/${selectedUser.id}`);
    setShowDeleteModal(false);
    fetchUsers();
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
          <button className="btn btn-primary" onClick={handleAdd}>Tambah User</button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped table-bordered shadow-sm rounded">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '5%' }}>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ width: '15%' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role?.name}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(user)}>Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user)}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content shadow-lg">
                <div className="modal-header bg-light text-dark">
                  <h5 className="modal-title">{editMode ? 'Edit User' : 'Tambah User'}</h5>
                  <button type="button" className="close text-dark" onClick={() => setShowModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label>Nama</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Masukkan nama" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Masukkan email" />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Masukkan password" />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <select name="role" value={formData.role} onChange={handleChange} className="form-control">
                        <option value="">Pilih Role</option>
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
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
                  <p>Yakin ingin menghapus user ini?</p>
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

export default IndexUser;
