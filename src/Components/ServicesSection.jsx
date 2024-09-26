import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t, i18n } = useTranslation();

  // Fetch data from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}services`);
        setServices(response?.data?.data?.data); // Assuming response has 'data.data' structure
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="py-16 bg-gray-50 px-4" dir="rtl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">خدماتنا</h2>
        <p className="mt-4 text-gray-600">نقدم لك الأفضل في عالم الخدمات</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-6 text-center">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/storage/${service.media}`}
                alt={service.name}
                className="mb-4 mx-auto rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
              <p className="text-gray-600 mb-6 text-justify min-h-[300px]">
                {service.details ? service.details : "تفاصيل الخدمة غير متاحة"}
              </p>
              <a
                href={`https://wa.me/123456789?text=أريد طلب الخدمة: ${service.name}`}
                className="inline-block px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] hover:from-[#1e6bb8] hover:to-[#2481ce] transition duration-300"
              >
                طلب الخدمة عبر واتساب
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to={`${i18n.language == "en" ? "en" : "ar"}/services`}
          className="filled-button"
        >
          Show More
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;
