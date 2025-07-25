import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'طقم أواني ألمنيوم فاخر',
      description: 'طقم أواني طبخ من الألمنيوم عالي الجودة، مقاوم للخدش ومناسب لجميع أنواع المواقد',
      price: '299 جنيه',
      originalPrice: '350 جنيه',
      discount: 15,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
      category: 'أواني طبخ',
      productUrl: 'https://example.com/aluminum-cookware-set'
    },
    {
      id: 2,
      name: 'حلة ضغط كبيرة',
      description: 'حلة ضغط من الستانلس ستيل، سعة 8 لتر، مثالية للعائلات الكبيرة',
      price: '199 جنيه',
      originalPrice: '250 جنيه',
      discount: 20,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
      category: 'أواني طبخ',
      productUrl: 'https://example.com/pressure-cooker-large'
    },
    {
      id: 3,
      name: 'طقم علب حفظ بلاستيكية',
      description: 'مجموعة من 12 علبة حفظ بأحجام مختلفة، محكمة الإغلاق وآمنة للاستخدام',
      price: '89 جنيه',
      originalPrice: '120 جنيه',
      discount: 25,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      category: 'منتجات بلاستيكية',
      productUrl: 'https://example.com/plastic-storage-containers'
    },
    {
      id: 4,
      name: 'مقلاة تيفال أصلية',
      description: 'مقلاة غير لاصقة من التيفال الأصلي، مقاس 28 سم، مناسبة لجميع أنواع الطبخ',
      price: '149 جنيه',
      originalPrice: '180 جنيه',
      discount: 17,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
      category: 'أواني طبخ',
      productUrl: 'https://example.com/tefal-original-pan'
    },
    {
      id: 5,
      name: 'طقم أدوات مطبخ',
      description: 'مجموعة شاملة من أدوات المطبخ الأساسية، مصنوعة من مواد عالية الجودة',
      price: '79 جنيه',
      originalPrice: '100 جنيه',
      discount: 21,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
      category: 'أدوات مطبخ',
      productUrl: 'https://example.com/kitchen-utensils-set'
    },
    {
      id: 6,
      name: 'خلاط كهربائي قوي',
      description: 'خلاط كهربائي بقوة 1000 واط، مع عدة ملحقات للاستخدامات المتنوعة',
      price: '399 جنيه',
      originalPrice: '500 جنيه',
      discount: 20,
      image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop',
      category: 'أجهزة كهربائية',
      productUrl: 'https://example.com/electric-blender'
    },
    {
      id: 7,
      name: 'أطباق بلاستيك ملونة',
      description: 'مجموعة من 6 أطباق بلاستيكية بألوان زاهية، آمنة ومقاومة للكسر',
      price: '45 جنيه',
      originalPrice: '60 جنيه',
      discount: 25,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
      category: 'منتجات بلاستيكية',
      productUrl: 'https://example.com/colorful-plastic-plates'
    },
    {
      id: 8,
      name: 'سكاكين مطبخ احترافية',
      description: 'طقم سكاكين مطبخ من الستانلس ستيل، حادة ومقاومة للصدأ',
      price: '129 جنيه',
      originalPrice: '160 جنيه',
      discount: 19,
      image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=300&h=300&fit=crop',
      category: 'أدوات مطبخ',
      productUrl: 'https://example.com/professional-kitchen-knives'
    }
  ]);

  // إضافة منتج جديد
  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now()
    };
    setProducts([...products, newProduct]);
  };

  // حذف منتج
  const handleDeleteProduct = (productId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  // تحديث منتج
  const handleUpdateProduct = (productId, updatedData) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, ...updatedData } : product
    ));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                products={products}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
              />
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminPage 
                products={products}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

