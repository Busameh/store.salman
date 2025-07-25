import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">Salman Home Store</Link>
        <nav>
          <ul className="nav-menu">
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#products">المنتجات</a></li>
            <li><a href="#about">من نحن</a></li>
            <li><a href="#contact">اتصل بنا</a></li>
            <li><Link to="/admin" className="admin-link">🔧 لوحة التحكم</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

