import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ products, onAddProduct, onDeleteProduct, onUpdateProduct }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    category: '',
    productUrl: ''
  });

  const categories = ['أواني طبخ', 'منتجات بلاستيكية', 'أدوات مطبخ', 'أجهزة كهربائية'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // تحويل القيم الرقمية
    const processedData = {
      ...formData,
      discount: formData.discount ? parseInt(formData.discount) : 0,
      price: formData.price.includes('جنيه') ? formData.price : `${formData.price} جنيه`,
      originalPrice: formData.originalPrice ? 
        (formData.originalPrice.includes('جنيه') ? formData.originalPrice : `${formData.originalPrice} جنيه`) : '',
    };

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, processedData);
      setEditingProduct(null);
    } else {
      onAddProduct(processedData);
      setShowAddForm(false);
    }
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      discount: '',
      image: '',
      category: '',
      productUrl: ''
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.replace(' جنيه', ''),
      originalPrice: product.originalPrice ? product.originalPrice.replace(' جنيه', '') : '',
      discount: product.discount || '',
      image: product.image || '',
      category: product.category,
      productUrl: product.productUrl || ''
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      discount: '',
      image: '',
      category: '',
      productUrl: ''
    });
  };

  return (
    <div className="admin-panel">
      <div className="admin-content">
        <div className="admin-actions">
          <button 
            className="add-btn"
            onClick={() => setShowAddForm(true)}
            disabled={showAddForm}
          >
            ➕ إضافة منتج جديد
          </button>
        </div>

        {showAddForm && (
          <div className="add-form-container">
            <h3>{editingProduct ? '✏️ تعديل المنتج' : '➕ إضافة منتج جديد'}</h3>
            <form onSubmit={handleSubmit} className="add-form">
              <div className="form-row">
                <div className="form-group">
                  <label>اسم المنتج:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>الفئة:</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>وصف المنتج:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>السعر الحالي (بالجنيه):</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>السعر الأصلي (اختياري):</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="للعروض والخصومات"
                  />
                </div>
                <div className="form-group">
                  <label>نسبة الخصم (%):</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    placeholder="0-100"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>رابط صورة المنتج:</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
                <small style={{color: '#666', fontSize: '0.9rem'}}>
                  استخدم روابط من Unsplash أو مواقع الصور المجانية
                </small>
              </div>

              <div className="form-group">
                <label>رابط المنتج:</label>
                <input
                  type="url"
                  name="productUrl"
                  value={formData.productUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/product"
                />
                <small style={{color: '#666', fontSize: '0.9rem'}}>
                  اتركه فارغاً إذا لم يكن لديك رابط للمنتج
                </small>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingProduct ? '💾 حفظ التعديلات' : '➕ إضافة المنتج'}
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  ❌ إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="products-list">
          <h3>📦 المنتجات الحالية ({products.length})</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>الصورة</th>
                  <th>الاسم</th>
                  <th>الوصف</th>
                  <th>السعر</th>
                  <th>الخصم</th>
                  <th>الفئة</th>
                  <th>رابط المنتج</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="product-thumbnail"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=50&h=50&fit=crop';
                        }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td className="description-cell">{product.description}</td>
                    <td>
                      <div className="price-cell">
                        <span className="current-price">{product.price}</span>
                        {product.originalPrice && (
                          <span className="original-price-small">{product.originalPrice}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      {product.discount ? (
                        <span className="discount-badge-small">-{product.discount}%</span>
                      ) : (
                        <span style={{color: '#999'}}>لا يوجد</span>
                      )}
                    </td>
                    <td>
                      <span className="category-badge">{product.category}</span>
                    </td>
                    <td>
                      {product.productUrl ? (
                        <a 
                          href={product.productUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{color: '#667eea', textDecoration: 'none'}}
                        >
                          🔗 زيارة
                        </a>
                      ) : (
                        <span style={{color: '#999'}}>لا يوجد رابط</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-btn"
                          onClick={() => handleEdit(product)}
                        >
                          ✏️ تعديل
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={() => onDeleteProduct(product.id)}
                        >
                          🗑️ حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

