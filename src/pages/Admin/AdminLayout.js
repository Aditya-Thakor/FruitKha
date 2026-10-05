import React, { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Admin.css';
import { resetAdminData } from './mockData';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes('/admin/products')) return 'Product Management';
    if (location.pathname.includes('/admin/users')) return 'User Management';
    return 'Admin Dashboard';
  };

  const handleResetData = () => {
    if (window.confirm("Reset all products and users to original Fruitkha demo data?")) {
      resetAdminData();
      window.location.reload();
    }
  };

  return (
    <div className="admin-wrapper">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin" className="admin-brand">
            <img src={logo} alt="Fruitkha" />
            <span className="admin-brand-tag">Admin</span>
          </Link>
        </div>

        <ul className="admin-nav">
          <li className="admin-nav-item">
            <NavLink 
              to="/admin" 
              end 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-chart-pie"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="admin-nav-item">
            <NavLink 
              to="/admin/products" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-apple-whole"></i>
              <span>Products</span>
            </NavLink>
          </li>
          <li className="admin-nav-item">
            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setSidebarOpen(false)}
            >
              <i className="fa-solid fa-users"></i>
              <span>Users</span>
            </NavLink>
          </li>

          <li style={{ marginTop: 'auto', paddingTop: '16px' }} className="admin-nav-item">
            <Link to="/" className="admin-nav-back">
              <i className="fa-solid fa-arrow-left"></i>
              <span>Back to Store</span>
            </Link>
          </li>
        </ul>

        <div className="admin-sidebar-footer">
          <div className="admin-profile-pill">
            <div className="admin-avatar">A</div>
            <div className="admin-profile-info">
              <span className="admin-profile-name">Fruitkha Admin</span>
              <span className="admin-profile-role">Super Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button 
              className="admin-sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle Navigation"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="admin-topbar-headings">
              <div className="admin-breadcrumb">Fruitkha Operations</div>
              <h1 className="admin-page-title">{getPageTitle()}</h1>
            </div>
          </div>

          <div className="admin-topbar-right">
            <span className="admin-status-pill">
              <span className="pulse-dot"></span>
              <span>Storefront Live</span>
            </span>

            <button 
              className="btn-admin-outline"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
              onClick={handleResetData}
              title="Reset Demo Data"
            >
              <i className="fa-solid fa-rotate-left me-1"></i>
              Reset Demo
            </button>

            <Link to="/" className="btn-visit-store" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-store"></i>
              <span>View Store</span>
            </Link>
          </div>
        </header>

        {/* Child Views */}
        <main className="admin-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
