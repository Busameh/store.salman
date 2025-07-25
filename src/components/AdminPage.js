import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';
import './AdminPage.css';

const AdminPage = ({ products, onAddProduct, onDeleteProduct, onUpdateProduct }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // تسجيل دخول المدير
  const handleAdminLogin = (password) => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // تسجيل خروج المدير
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // العودة للصفحة الرئيسية
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="admin-page">
      {!isAuthenticated ? (
        <div className="admin-login-container">
          <div className="admin-header">
            <button className="back-to-home-btn" onClick={handleBackToHome}>
              ← العودة للرئيسية
            </button>
            <h1>🔐 لوحة تحكم المدير</h1>
            <p>يرجى تسجيل الدخول للوصول إلى لوحة التحكم</p>
          </div>
          <AdminLogin 
            onLogin={handleAdminLogin}
            onClose={handleBackToHome}
          />
        </div>
      ) : (
        <div className="admin-panel-container">
          <div className="admin-header">
            <div className="admin-header-content">
              <button className="back-to-home-btn" onClick={handleBackToHome}>
                ← العودة للرئيسية
              </button>
              <h1>🛠️ لوحة تحكم Salman Home Store</h1>
              <button className="logout-btn" onClick={handleLogout}>
                تسجيل خروج 🚪
              </button>
            </div>
          </div>
          <AdminPanel
            products={products}
            onAddProduct={onAddProduct}
            onDeleteProduct={onDeleteProduct}
            onUpdateProduct={onUpdateProduct}
            onClose={handleBackToHome}
          />
        </div>
      )}
    </div>
  );
};

export default AdminPage;

