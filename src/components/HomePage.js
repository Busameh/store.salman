import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import ImageSlider from './ImageSlider';
import CategoryFilter from './CategoryFilter';
import Products from './Products';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

const HomePage = ({ products, onAddProduct, onDeleteProduct, onUpdateProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [currentPage, setCurrentPage] = useState(1);

  // الحصول على الفئات المتاحة
  const getAvailableCategories = () => {
    const categories = ['الكل'];
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return [...categories, ...uniqueCategories];
  };

  // تصفية المنتجات حسب الفئة المختارة
  const getFilteredProducts = () => {
    if (selectedCategory === 'الكل') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  };

  // تقسيم المنتجات إلى صفحات (5 منتجات لكل صفحة)
  const getProductsForCurrentPage = () => {
    const filteredProducts = getFilteredProducts();
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // حساب عدد الصفحات
  const getTotalPages = () => {
    const filteredProducts = getFilteredProducts();
    return Math.ceil(filteredProducts.length / 5);
  };

  // تغيير الفئة المختارة
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // العودة للصفحة الأولى عند تغيير الفئة
  };

  // تغيير الصفحة
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // التمرير إلى أعلى قسم المنتجات
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // دالة التمرير إلى قسم المنتجات
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header />
      <ImageSlider onShopNow={scrollToProducts} />
      <Hero onShopNow={scrollToProducts} />
      
      <section id="products">
        <CategoryFilter 
          categories={getAvailableCategories()}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        <Products 
          products={getProductsForCurrentPage()}
          currentPage={currentPage}
          totalPages={getTotalPages()}
          onPageChange={handlePageChange}
          selectedCategory={selectedCategory}
          totalProducts={getFilteredProducts().length}
        />
      </section>
      
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;

