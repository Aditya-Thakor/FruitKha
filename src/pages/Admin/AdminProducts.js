import React, { useState, useEffect } from 'react';
import { getStoredProducts, saveStoredProducts } from './mockData';
import product1 from '../../assets/images/products/product-img-1.jpg';
import product2 from '../../assets/images/products/product-img-2.jpg';
import product3 from '../../assets/images/products/product-img-3.jpg';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Berries',
    price: '',
    stock: '',
    unit: 'Kg',
    status: 'In Stock',
    image: '',
    calories: '',
    description: ''
  });

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const persistProducts = (updated) => {
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Berries',
      price: '',
      stock: '20',
      unit: 'Kg',
      status: 'In Stock',
      image: product1,
      calories: '45',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      unit: product.unit || 'Kg',
      status: product.status,
      image: product.image,
      calories: product.calories || '',
      description: product.description || ''
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert("Please fill in the product name and price.");
      return;
    }

    const stockNum = parseInt(formData.stock) || 0;
    let computedStatus = formData.status;
    if (stockNum === 0) computedStatus = 'Out of Stock';
    else if (stockNum <= 10) computedStatus = 'Low Stock';
    else if (computedStatus === 'Out of Stock') computedStatus = 'In Stock';

    if (editingProduct) {
      const updated = products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              ...formData, 
              price: parseFloat(formData.price), 
              stock: stockNum,
              calories: parseInt(formData.calories) || 0,
              status: computedStatus 
            }
          : p
      );
      persistProducts(updated);
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        stock: stockNum,
        calories: parseInt(formData.calories) || 0,
        status: computedStatus
      };
      persistProducts([newProduct, ...products]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const updated = products.filter(p => p.id !== deleteTarget.id);
      persistProducts(updated);
      setDeleteTarget(null);
    }
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div>
      {/* Header and Add button */}
      <div className="admin-toolbar">
        <div className="admin-search-box">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            className="admin-search-input" 
            placeholder="Search fruits by name or category..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="admin-filters-group">
          <select 
            className="admin-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((c, i) => (
              <option key={i} value={c}>{c === 'All' ? 'All Categories' : c}</option>
            ))}
          </select>

          <select 
            className="admin-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="In Stock">In Stock</option>
            {/* <option value="Low Stock">Low Stock</option> */}
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <button className="btn-admin-primary" onClick={handleOpenAdd}>
            <i className="fa-solid fa-plus"></i>
            Add Fruit
          </button>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <i className="fa-solid fa-apple-whole text-warning"></i>
            Fruit Inventory ({filteredProducts.length} items)
          </h3>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Calories</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <i className="fa-solid fa-box-open d-block mb-2" style={{ fontSize: '2rem' }}></i>
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-thumb" 
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/80x80/f28123/ffffff?text=Fruit';
                          }}
                        />
                        <div>
                          <strong style={{ display: 'block', color: 'var(--admin-navy)', fontSize: '0.95rem' }}>
                            {product.name}
                          </strong>
                          {product.description && (
                            <small className="text-muted text-truncate" style={{ display: 'block', maxWidth: '240px' }}>
                              {product.description}
                            </small>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>
                      <strong>${product.price}</strong> 
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}> / {product.unit || 'Kg'}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600 }}>{product.stock}</span> {product.unit || 'Kg'}
                    </td>
                    <td>{product.calories ? `${product.calories} kcal` : '-'}</td>
                    <td>
                      <span className={`admin-badge ${
                        product.status === 'In Stock' ? 'badge-in-stock' :
                        product.status === 'Low Stock' ? 'badge-low-stock' : 'badge-out-of-stock'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="d-inline-flex gap-2">
                        <button 
                          className="btn-action-icon edit" 
                          title="Edit Product"
                          onClick={() => handleOpenEdit(product)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button 
                          className="btn-action-icon delete" 
                          title="Delete Product"
                          onClick={() => setDeleteTarget(product)}
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
              <h4>{editingProduct ? 'Edit Fruit Product' : 'Add New Fruit Product'}</h4>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>Product Name *</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    placeholder="e.g. Fresh Red Apple" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Category</label>
                    <select 
                      className="admin-form-control"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="fruit">Fruit</option>
                      <option value="vegetable">Vegetable</option>
                      {/* <option value="Berries">Berries</option>
                      <option value="Citrus">Citrus</option>
                      <option value="Tropical">Tropical</option>
                      <option value="Melons">Melons</option>
                      <option value="Pome">Pome</option>
                      <option value="Stone Fruit">Stone Fruit</option>
                      <option value="Organic Exotic">Organic Exotic</option> */}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>Price ($ per unit) *</label>
                    <input 
                      type="number" 
                      step="0.01" 
                      className="admin-form-control" 
                      placeholder="e.g. 45" 
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Stock Quantity</label>
                    <input 
                      type="number" 
                      className="admin-form-control" 
                      placeholder="e.g. 50" 
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Unit</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      placeholder="e.g. Kg, Box, Pack" 
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Calories (kcal)</label>
                    <input 
                      type="number" 
                      className="admin-form-control" 
                      placeholder="e.g. 52" 
                      value={formData.calories}
                      onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Stock Status</label>
                    <select 
                      className="admin-form-control"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Image Source / URL</label>
                  <input 
                    type="text" 
                    className="admin-form-control mb-2" 
                    placeholder="https://... or select below" 
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  <div className="d-flex gap-2">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setFormData({ ...formData, image: product1 })}
                    >
                      Strawberry Preset
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setFormData({ ...formData, image: product2 })}
                    >
                      Berry Preset
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => setFormData({ ...formData, image: product3 })}
                    >
                      Lemon Preset
                    </button>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Description</label>
                  <textarea 
                    rows="2" 
                    className="admin-form-control" 
                    placeholder="Brief description of the fruit..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="btn-admin-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  <i className="fa-solid fa-check"></i>
                  {editingProduct ? 'Save Changes' : 'Create Product'}
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
              <h4>Delete Product</h4>
              <button className="admin-modal-close" onClick={() => setDeleteTarget(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="admin-modal-body">
              <p className="mb-0">
                Are you sure you want to delete <strong>{deleteTarget.name}</strong> from the catalog? This action cannot be undone.
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
