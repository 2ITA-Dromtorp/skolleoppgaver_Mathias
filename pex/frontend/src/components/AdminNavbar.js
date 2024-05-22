import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <NavLink to="/admin/users" activeClassName="active">Manage Users</NavLink>
      <NavLink to="/admin/orders" activeClassName="active">Manage Orders</NavLink>
      <NavLink to="/admin/stock" activeClassName="active">Manage Stock</NavLink>
    </nav>
  );
};

export default AdminNavbar;
