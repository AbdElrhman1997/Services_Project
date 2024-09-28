import React from "react";

const ContactSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-6 text-[#2481ce]">تواصل معنا</h2>

        {/* Section Description */}
        <p className="text-lg mb-8 text-gray-700">
          نحن هنا للإجابة على أي استفسارات أو اقتراحات. لا تتردد في التواصل معنا
          من خلال الوسائل التالية:
        </p>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800 mb-10">
          {/* Address */}
          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#2481ce]">
            <h3 className="text-2xl font-semibold mb-4">عنوان المكتب</h3>
            <p>123 شارع النجاح، مدينة المستقبل، المملكة العربية السعودية</p>
          </div>

          {/* Phone */}
          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#2481ce]">
            <h3 className="text-2xl font-semibold mb-4">الهاتف</h3>
            <p>+966 123 456 789</p>
          </div>

          {/* Email */}
          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#2481ce]">
            <h3 className="text-2xl font-semibold mb-4">البريد الإلكتروني</h3>
            <p>contact@company.com</p>
          </div>
        </div>

        {/* Call to Action Button */}
        <button className="bg-[#2481ce] text-white px-8 py-4 rounded-full hover:bg-[#1c669b] transition duration-300">
          اتصل بنا الآن
        </button>

        {/* Social Media */}
        <div className="mt-8 flex justify-center gap-6">
          {/* Example Social Icons */}
          <a
            href="#"
            className="text-[#2481ce] hover:text-[#1c669b] transition"
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a
            href="#"
            className="text-[#2481ce] hover:text-[#1c669b] transition"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a
            href="#"
            className="text-[#2481ce] hover:text-[#1c669b] transition"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
