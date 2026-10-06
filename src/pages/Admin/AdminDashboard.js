import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStoredProducts, saveStoredProducts, getStoredUsers } from './mockData';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'attention', 'instock'

  const refreshData = () => {
    setProducts(getStoredProducts());
    setUsers(getStoredUsers());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const totalProducts = products.length;
  const inStockList = products.filter(p => p.status === 'In Stock');
  const lowStockList = products.filter(p => p.status === 'Low Stock');
  const outOfStockList = products.filter(p => p.status === 'Out of Stock');
  const attentionList = [...outOfStockList, ...lowStockList];

  const totalStockKg = products.reduce((acc, p) => acc + (parseInt(p.stock) || 0), 0);
  const averagePrice = totalProducts > 0
    ? (products.reduce((acc, p) => acc + (parseFloat(p.price) || 0), 0) / totalProducts).toFixed(2)
    : '0.00';

  const totalUsers = users.length;
  const customersList = users.filter(u => u.role === 'Customer');
  const staffList = users.filter(u => u.role === 'Admin' || u.role === 'Manager');
  const totalOrdersSum = users.reduce((acc, u) => acc + (u.ordersCount || 0), 0);

  // Quick Restock Single Fruit
  const handleQuickRestock = (productId, addAmount = 20) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const newStock = (parseInt(p.stock) || 0) + addAmount;
        let newStatus = 'In Stock';
        if (newStock === 0) newStatus = 'Out of Stock';
        else if (newStock <= 10) newStatus = 'Low Stock';
        return { ...p, stock: newStock, status: newStatus };
      }
      return p;
    });
    setProducts(updated);
    saveStoredProducts(updated);
  };

  // Quick Restock all low/out of stock items
  const handleRestockAllAttention = () => {
    const updated = products.map(p => {
      if (p.status === 'Low Stock' || p.status === 'Out of Stock') {
        const newStock = (parseInt(p.stock) || 0) + 25;
        return { ...p, stock: newStock, status: 'In Stock' };
      }
      return p;
    });
    setProducts(updated);
    saveStoredProducts(updated);
  };

  // Filtered products for dashboard preview
  const displayProducts = products.filter(p => {
    if (filterMode === 'attention') return p.status === 'Low Stock' || p.status === 'Out of Stock';
    if (filterMode === 'instock') return p.status === 'In Stock';
    return true;
  });

  // Calculate percentages for distribution bar
  const inStockPct = totalProducts > 0 ? (inStockList.length / totalProducts) * 100 : 0;
  const lowStockPct = totalProducts > 0 ? (lowStockList.length / totalProducts) * 100 : 0;
  const outStockPct = totalProducts > 0 ? (outOfStockList.length / totalProducts) * 100 : 0;

  return (
    <div className="admin-dashboard-container">
      {/* Operations Header */}
      <div className="admin-header-strip">
        <div>
          <h2 className="admin-section-heading">Catalog & Inventory Operations</h2>
          <p className="admin-section-sub">
            Real-time stock monitor, catalog pricing, and customer activity.
          </p>
        </div>
        <div className="admin-header-actions">
          <Link to="/admin/products" className="btn-admin-primary">
            <i className="fa-solid fa-plus"></i>
            <span>Add New Fruit</span>
          </Link>
          {attentionList.length > 0 && (
            <button
              onClick={handleRestockAllAttention}
              className="btn-admin-secondary"
              title="Restock all low/out-of-stock items by +25 Kg"
            >
              <i className="fa-solid fa-truck-ramp-box"></i>
              <span>Restock Low ({attentionList.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Operations Intelligence Panel */}
      <div className="admin-ops-grid">
        {/* Card 1: Inventory Health Barometer */}
        <div className="admin-ops-card">
          <div>
            <div className="admin-ops-card-label">
              <span>Inventory Depth & Health</span>
              <span className="badge-ops-pill">{totalProducts} SKUs</span>
            </div>
            <div className="admin-ops-card-value">
              {totalStockKg} <span className="ops-unit">Kg Total Stock</span>
            </div>
            <p className="admin-ops-card-sub">
              {inStockList.length} varieties optimal, {attentionList.length} requiring restock.
            </p>
          </div>

          <div>
            {/* Visual Stock Distribution Bar */}
            <div className="stock-distribution-bar" title={`In Stock: ${inStockList.length} | Low Stock: ${lowStockList.length} | Out: ${outOfStockList.length}`}>
              <div className="stock-segment in-stock" style={{ width: `${inStockPct}%` }}></div>
              <div className="stock-segment low-stock" style={{ width: `${lowStockPct}%` }}></div>
              <div className="stock-segment out-stock" style={{ width: `${outStockPct}%` }}></div>
            </div>

            <div className="stock-legend">
              <span className="stock-legend-item">
                <span className="legend-dot in-stock"></span>
                <span>In Stock ({inStockList.length})</span>
              </span>
              <span className="stock-legend-item">
                <span className="legend-dot low-stock"></span>
                <span>Low ({lowStockList.length})</span>
              </span>
              <span className="stock-legend-item">
                <span className="legend-dot out-stock"></span>
                <span>Out ({outOfStockList.length})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Catalog Economics */}
        <div className="admin-ops-card">
          <div>
            <div className="admin-ops-card-label">
              <span>Pricing Economics</span>
              <i className="fa-solid fa-coins text-warning"></i>
            </div>
            <div className="admin-ops-card-value">
              ${averagePrice} <span className="ops-unit">/ Kg Avg</span>
            </div>
            <p className="admin-ops-card-sub">
              Across 5 organic categories: Berries, Citrus, Tropical, Melons, and Pome.
            </p>
          </div>

          <div className="category-tags-preview">
            <span className="admin-category-tag">Berries (2)</span>
            <span className="admin-category-tag">Citrus (2)</span>
            <span className="admin-category-tag">Tropical (2)</span>
            <span className="admin-category-tag">Melons (1)</span>
          </div>
        </div>

        {/* Card 3: Customer Pipeline */}
        <div className="admin-ops-card">
          <div>
            <div className="admin-ops-card-label">
              <span>Customer Activity</span>
              <i className="fa-solid fa-users text-primary"></i>
            </div>
            <div className="admin-ops-card-value">
              {totalUsers} <span className="ops-unit">Accounts</span>
            </div>
            <p className="admin-ops-card-sub">
              {customersList.length} verified buyers, {staffList.length} admin staff members.
            </p>
          </div>

          <div className="d-flex align-items-center justify-content-between pt-2 border-top border-light">
            <span className="text-muted" style={{ fontSize: '0.82rem' }}>Total Orders Fulfilled:</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--admin-navy)' }}>{totalOrdersSum} Orders</strong>
          </div>
        </div>
      </div>

      {/* Urgent Attention / Action Bar when Low Stock exists */}
      {attentionList.length > 0 && (
        <div className="admin-stock-alert-strip">
          <div className="admin-stock-alert-content">
            <div className="admin-stock-alert-icon">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div>
              <h4 className="admin-stock-alert-title">
                Attention Required: {attentionList.length} {attentionList.length === 1 ? 'fruit is' : 'fruits are'} low on inventory
              </h4>
              <p className="admin-stock-alert-desc">
                Replenish stock directly below to avoid order fulfillment interruptions.
              </p>
            </div>
          </div>

          <div className="admin-stock-pills-list">
            {attentionList.map(item => (
              <button
                key={item.id}
                onClick={() => handleQuickRestock(item.id, 25)}
                className="admin-stock-pill-btn"
                title={`Click to add +25 Kg to ${item.name}`}
              >
                <span>{item.name}: <strong>{item.stock} {item.unit || 'Kg'}</strong></span>
                <span className="badge-plus">+25 Kg</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Tables Grid */}
      <div className="row g-4">
        {/* Products Inventory Table */}
        <div className="col-12 col-xl-7">
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="d-flex align-items-center gap-2">
                <h3 className="admin-card-title">
                  <i className="fa-solid fa-boxes-stacked" style={{ color: 'var(--admin-orange)' }}></i>
                  Fruit Catalog Inventory
                </h3>
              </div>

              {/* Table Quick Filters */}
              <div className="admin-table-filters">
                <button
                  className={`btn-table-tab ${filterMode === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterMode('all')}
                >
                  All ({products.length})
                </button>
                <button
                  className={`btn-table-tab ${filterMode === 'attention' ? 'active' : ''}`}
                  onClick={() => setFilterMode('attention')}
                >
                  Needs Stock ({attentionList.length})
                </button>
                <button
                  className={`btn-table-tab ${filterMode === 'instock' ? 'active' : ''}`}
                  onClick={() => setFilterMode('instock')}
                >
                  Optimal ({inStockList.length})
                </button>
              </div>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Fruit Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock Level</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayProducts.slice(0, 6).map(product => {
                    const stockNum = parseInt(product.stock) || 0;
                    const stockGaugePct = Math.min(100, Math.round((stockNum / 60) * 100));
                    const statusClass =
                      product.status === 'In Stock' ? 'in-stock' :
                        product.status === 'Low Stock' ? 'low-stock' : 'out-of-stock';

                    return (
                      <tr key={product.id}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="product-thumb"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=100&q=80';
                              }}
                            />
                            <div>
                              <div className="admin-table-product-name">{product.name}</div>
                              <div className="admin-table-product-meta">{product.calories} kcal / 100g</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="admin-category-tag">{product.category}</span>
                        </td>
                        <td>
                          <span className="admin-price-tag">${product.price}</span>
                          <span className="admin-unit-tag"> / {product.unit || 'Kg'}</span>
                        </td>
                        <td>
                          <div className="stock-level-indicator">
                            <span style={{ fontWeight: 600, minWidth: '45px' }}>{product.stock} {product.unit || 'Kg'}</span>
                            <div className="stock-level-bar" title={`${product.stock} Kg on hand`}>
                              <div
                                className={`stock-level-bar-fill ${statusClass}`}
                                style={{ width: `${stockGaugePct}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`admin-status-chip ${statusClass}`}>
                            <span className="status-dot"></span>
                            {product.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <Link
                            to="/admin/products"
                            className="btn-table-action"
                            title="Edit product in Catalog Manager"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="admin-card-footer">
              <span className="text-muted" style={{ fontSize: '0.82rem' }}>
                Showing {Math.min(displayProducts.length, 6)} of {displayProducts.length} items
              </span>
              <Link to="/admin/products" className="admin-footer-link">
                View All Catalog <i className="fa-solid fa-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Registered Users Table */}
        <div className="col-12 col-xl-5">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">
                <i className="fa-solid fa-user-shield" style={{ color: '#0d6efd' }}></i>
                Customer & Staff Directory
              </h3>
              <Link to="/admin/users" className="admin-header-link">
                Manage ({totalUsers})
              </Link>
            </div>

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Orders</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 6).map(user => {
                    const isStaff = user.role === 'Admin' || user.role === 'Manager';
                    return (
                      <tr key={user.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className={`user-avatar-small ${isStaff ? 'staff' : ''}`}>
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div style={{ overflow: 'hidden' }}>
                              <div className="admin-table-user-name">{user.name}</div>
                              <div className="admin-table-user-email">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`admin-role-chip ${user.role.toLowerCase()}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span className="admin-orders-count">
                            <i className="fa-solid fa-bag-shopping me-1 text-muted"></i>
                            {user.ordersCount || 0}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-status-chip ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                            <span className="status-dot"></span>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="admin-card-footer">
              <span className="text-muted" style={{ fontSize: '0.82rem' }}>
                {customersList.length} buyers active
              </span>
              <Link to="/admin/users" className="admin-footer-link">
                View All Users <i className="fa-solid fa-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
