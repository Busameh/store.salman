import React from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  const categoryIcons = {
    'الكل': '🏠',
    'أواني طبخ': '🍳',
    'منتجات بلاستيكية': '🥤',
    'أدوات مطبخ': '🔪',
    'أجهزة كهربائية': '⚡'
  };

  return (
    <div className="category-filter">
      <div className="category-filter-container">
        <h3 className="filter-title">🏷️ تصفية حسب الفئة</h3>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onCategoryChange(category)}
            >
              <span className="category-icon">{categoryIcons[category] || '📦'}</span>
              <span className="category-name">{category}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;

