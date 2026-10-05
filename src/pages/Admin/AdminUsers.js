import React, { useState, useEffect } from 'react';
import { getStoredUsers, saveStoredUsers } from './mockData';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Customer',
    status: 'Active',
    phone: '',
    ordersCount: 0
  });

  useEffect(() => {
    setUsers(getStoredUsers());
  }, []);

  const persistUsers = (updated) => {
    setUsers(updated);
    saveStoredUsers(updated);
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'Customer',
      status: 'Active',
      phone: '',
      ordersCount: 0
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || '',
      ordersCount: user.ordersCount || 0
    });
    setIsModalOpen(true);
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    const updated = users.map(u => 
      u.id === user.id ? { ...u, status: newStatus } : u
    );
    persistUsers(updated);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and email are required.");
      return;
    }

    if (editingUser) {
      const updated = users.map(u => 
        u.id === editingUser.id ? { ...u, ...formData } : u
      );
      persistUsers(updated);
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      persistUsers([newUser, ...users]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const updated = users.filter(u => u.id !== deleteTarget.id);
      persistUsers(updated);
      setDeleteTarget(null);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div>
      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            className="admin-search-input" 
            placeholder="Search users by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-filters-group">
          <select 
            className="admin-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Customer">Customer</option>
          </select>

          <select 
            className="admin-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button className="btn-admin-primary" onClick={handleOpenAdd}>
            <i className="fa-solid fa-user-plus"></i>
            Add User
          </button>
        </div>
      </div>

      {/* Users Card Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <i className="fa-solid fa-users text-primary"></i>
            User Accounts ({filteredUsers.length} users)
          </h3>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Status (Click to toggle)</th>
                <th>Joined Date</th>
                <th>Orders</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <i className="fa-solid fa-user-slash d-block mb-2" style={{ fontSize: '2rem' }}></i>
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div className="user-avatar-small" style={{ backgroundColor: user.role === 'Admin' ? 'var(--admin-orange)' : '#051922' }}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong style={{ display: 'block', color: 'var(--admin-navy)', fontSize: '0.92rem' }}>
                            {user.name}
                          </strong>
                          <span className="text-muted" style={{ fontSize: '0.82rem' }}>
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{user.phone || '-'}</td>
                    <td>
                      <span className={`admin-badge badge-role-${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span 
                        className={`admin-badge ${user.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}
                        title="Click to toggle status"
                        onClick={() => handleToggleStatus(user)}
                      >
                        <i className={`fa-solid ${user.status === 'Active' ? 'fa-check' : 'fa-xmark'} me-1`}></i>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.joinedDate || 'Recently'}</td>
                    <td>
                      <span className="fw-semibold">{user.ordersCount || 0}</span> orders
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="d-inline-flex gap-2">
                        <button 
                          className="btn-action-icon edit" 
                          title="Edit User"
                          onClick={() => handleOpenEdit(user)}
                        >
                          <i className="fa-solid fa-user-pen"></i>
                        </button>
                        <button 
                          className="btn-action-icon delete" 
                          title="Delete User"
                          onClick={() => setDeleteTarget(user)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h4>{editingUser ? 'Edit User Account' : 'Add New User'}</h4>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Email Address *</label>
                  <input 
                    type="email" 
                    className="admin-form-control" 
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Role</label>
                    <select 
                      className="admin-form-control"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="Customer">Customer</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Status</label>
                    <select 
                      className="admin-form-control"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      placeholder="e.g. +1 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Completed Orders</label>
                    <input 
                      type="number" 
                      className="admin-form-control" 
                      placeholder="0"
                      value={formData.ordersCount}
                      onChange={(e) => setFormData({ ...formData, ordersCount: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="btn-admin-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  <i className="fa-solid fa-check"></i>
                  {editingUser ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '420px' }}>
            <div className="admin-modal-header">
              <h4>Delete User</h4>
              <button className="admin-modal-close" onClick={() => setDeleteTarget(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="admin-modal-body">
              <p className="mb-0">
                Are you sure you want to remove user <strong>{deleteTarget.name}</strong> ({deleteTarget.email})?
              </p>
            </div>
            <div className="admin-modal-footer">
              <button type="button" className="btn-admin-outline" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button type="button" className="btn-admin-danger" onClick={handleDeleteConfirm}>
                <i className="fa-solid fa-trash-can me-1"></i>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
