import React from 'react';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact-content">
        <h2 className="section-title">اتصل بنا</h2>
        <div className="contact-info">
          <div className="contact-item">
            <h3>📞 الهاتف</h3>
            <p>+966 50 123 4567</p>
            <p>+966 11 234 5678</p>
          </div>
          <div className="contact-item">
            <h3>📧 البريد الإلكتروني</h3>
            <p>info@salmanhomestore.com</p>
            <p>sales@salmanhomestore.com</p>
          </div>
          <div className="contact-item">
            <h3>📍 العنوان</h3>
            <p>الرياض، المملكة العربية السعودية</p>
            <p>شارع الملك فهد، حي العليا</p>
          </div>
          <div className="contact-item">
            <h3>⏰ ساعات العمل</h3>
            <p>السبت - الخميس: 9:00 ص - 10:00 م</p>
            <p>الجمعة: 2:00 م - 10:00 م</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

