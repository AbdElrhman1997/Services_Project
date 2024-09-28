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
      const params = {
        dataLimit: 3,
      };
      try {
        const response = await axios.get(`${BASE_URL}services`, {
          params,
          headers: {
            "Accept-Language": i18n.language,
          },
        });
        setServices(response?.data?.data?.data); // Assuming response has 'data.data' structure
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      className={`py-12 pb-16 bg-gray-50 px-4 ${
        i18n.language === "en" ? "text-left" : "text-right"
      }`}
      dir={i18n.language === "en" ? "ltr" : "rtl"}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">خدماتنا</h2>
        <p className="mt-4 text-gray-600">نقدم لك الأفضل في عالم الخدمات</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            // data-aos="fade-right"
            className="card shadow-xl aos-init aos-animate"
          >
            <img
              src={`http://195.35.37.105:200/storage/${service?.media}`}
              className="w-full h-60 object-cover"
              alt="Property"
            />
            <div className="flex justify-between items-center my-6 px-6">
              <div
                className={`font-semibold  px-3 py-1 rounded-sm ${
                  service.is_free
                    ? "bg-yellow-100 text-orange-400"
                    : "bg-[#2481ce] text-white"
                }`}
              >
                {service.is_free ? "Free" : "Paid"}
              </div>
              {/* <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="text-gray-400 cursor-pointer text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg> */}
            </div>
            <p className="px-6 text-slate-800 font-bold">{service?.name}</p>
            <p className="flex px-6 text-gray-500 min-h-[220px]">
              {service?.details}
            </p>
            <hr className="mt-4" />
            <div className="flex justify-between items-center px-6 py-[14px]">
              {service?.discount && (
                <p className="line-through"> ر.س {service?.price}</p>
              )}
              <div className="inline-block mx-auto px-4 py-[10px] text-white font-semibold rounded-full bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] hover:from-[#1e6bb8] hover:to-[#2481ce] transition duration-300">
                <a
                  href={`https://wa.me/123456789?text=أريد طلب الخدمة: ${service.name}`}
                  className="inline-block text-white font-semibold rounded-lg bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] hover:from-[#1e6bb8] hover:to-[#2481ce] transition duration-300"
                >
                  طلب الخدمة عبر واتساب
                </a>
              </div>
              {!service?.is_free && (
                <p className="text-slate-800 font-bold">
                  ر.س{" "}
                  {service?.price - (service?.price * service?.discount) / 100}
                </p>
              )}
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
