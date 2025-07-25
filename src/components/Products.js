import React from 'react';

const Products = ({ products, currentPage, totalPages, onPageChange, selectedCategory, totalProducts }) => {
  const handleProductClick = (productUrl) => {
    if (productUrl) {
      window.open(productUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-btn ${i === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          السابق
        </button>
        {pages}
        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          التالي
        </button>
      </div>
    );
  };

  const getCategoryDisplayText = () => {
    if (selectedCategory === 'الكل') {
      return 'جميع المنتجات';
    }
    return `منتجات ${selectedCategory}`;
  };

  return (
    <section className="products">
      <div className="products-content">
        <h2 className="section-title">{getCategoryDisplayText()}</h2>
        <p className="section-subtitle">
          {selectedCategory === 'الكل' 
            ? `اكتشف مجموعتنا الواسعة من المنتجات المنزلية عالية الجودة (${totalProducts} منتج)`
            : `تصفح منتجات ${selectedCategory} المميزة (${totalProducts} منتج)`
          }
        </p>
        
        {products.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">📦</div>
            <h3>لا توجد منتجات في هذه الفئة</h3>
            <p>جرب تصفح فئة أخرى أو العودة لجميع المنتجات</p>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {products.map(product => (
                <div 
                  key={product.id} 
                  className={`product-card ${product.productUrl ? 'clickable' : ''}`}
                  onClick={() => handleProductClick(product.productUrl)}
                  style={{cursor: product.productUrl ? 'pointer' : 'default'}}
                >
                  {product.discount && (
                    <div className="discount-badge">
                      -{product.discount}%
                    </div>
                  )}
                  
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-image"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop';
                      }}
                    />
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-pricing">
                      <div className="current-price">{product.price}</div>
                      {product.originalPrice && product.discount && (
                        <div className="original-price">{product.originalPrice}</div>
                      )}
                    </div>
                    
                    <div className="product-footer">
                      <span className="product-category">{product.category}</span>
                      {product.productUrl && (
                        <button 
                          className="visit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product.productUrl);
                          }}
                        >
                          زيارة
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {renderPagination()}
          </>
        )}
      </div>
    </section>
  );
};

export default Products;

