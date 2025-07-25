import React from 'react';

const Hero = ({ onShopNow }) => {
  const handleShopNow = () => {
    if (onShopNow) {
      onShopNow();
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>متجر سلمان للمنتجات المنزلية</h1>
        <p>
          اكتشف مجموعتنا الواسعة من المنتجات المنزلية عالية الجودة<br/>
          أواني طبخ، حلل، منتجات بلاستيكية وأدوات مطبخ بأفضل الأسعار
        </p>
        <button className="cta-button" onClick={handleShopNow}>
          تسوق الآن
        </button>
      </div>
    </section>
  );
};

export default Hero;

