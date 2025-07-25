import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // محاكاة تأخير تسجيل الدخول
    setTimeout(() => {
      const success = onLogin(password);
      if (!success) {
        setError('كلمة المرور غير صحيحة');
        setPassword('');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-container">
        <div className="admin-login-header">
          <h2>🔐 تسجيل دخول المدير</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="password">كلمة المرور:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              required
              disabled={isLoading}
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading || !password.trim()}
          >
            {isLoading ? '🔄 جاري التحقق...' : '🚀 دخول'}
          </button>
          
          <div className="login-hint">
            💡 كلمة المرور الافتراضية: admin123
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

