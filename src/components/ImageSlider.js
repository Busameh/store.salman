import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop',
      title: '🔥 عروض حصرية على أواني الطبخ',
      subtitle: 'خصومات تصل إلى 50% على مجموعة مختارة',
      cta: 'تسوق الآن'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=1200&h=400&fit=crop',
      title: '✨ منتجات جديدة وصلت حديثاً',
      subtitle: 'اكتشف أحدث إضافاتنا من المنتجات المنزلية',
      cta: 'استكشف المجموعة'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop',
      title: '🎁 عرض خاص للعملاء الجدد',
      subtitle: 'احصل على خصم 25% على أول طلبية',
      cta: 'احصل على الخصم'
    }
  ];

  // التنقل التلقائي بين الشرائح
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleShopNow = () => {
    if (onShopNow) {
      onShopNow();
    }
  };

  return (
    <div className="image-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`
            }}
          >
            <div className="slide-content">
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <button className="slide-cta" onClick={handleShopNow}>
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* أزرار التنقل */}
      <button className="slider-btn prev-btn" onClick={prevSlide}>
        ❮
      </button>
      <button className="slider-btn next-btn" onClick={nextSlide}>
        ❯
      </button>

      {/* مؤشرات الشرائح */}
      <div className="slider-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

