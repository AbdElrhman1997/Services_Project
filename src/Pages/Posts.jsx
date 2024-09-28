import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";

const Posts = () => {
  const [services, setServices] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t, i18n } = useTranslation();

  // Fetch data from backend
  const fetchServices = async (
    pageUrl = `http://195.35.37.105:200/api/consultations?page=${currentPage}`
  ) => {
    const params = {
      // dataLimit: 3,
    };
    try {
      const response = await axios.get(pageUrl, {
        params,
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      const data = response.data.data;
      setServices(data.data); // Service data
      setPaginationData(data); // Pagination data
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  fetchServices();
  useEffect(() => {
    fetchServices();
  }, []);

  const handlePageChange = (url) => {
    if (url) {
      fetchServices(url); // Fetch new page
    }
  };

  useEffect(() => {
    fetchServices(); // Initial fetch
  }, [currentPage]);

  return (
    <section className="pt-4 pb-12 bg-gray-50 mt-20 px-4" dir="rtl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">المقالات</h2>
        <p className="mt-4 text-gray-600">
          بعض من مشاركات عملائنا وزوار الموقع
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px] mb-4">
        {services?.length ? (
          services.map((service) => (
            <div
              // data-aos="fade-right"
              className="card shadow-xl aos-init aos-animate my-4"
            >
              <img
                src={`http://195.35.37.105:200/storage/${service?.media}`}
                className="blogImg h-60 mb-4"
                alt={service.name} // Use service name as alt text for better accessibility
              />

              <p className="px-6 text-slate-800 font-bold">{service?.name}</p>
              <p className="flex px-6 text-gray-500 min-h-[220px]">
                {service?.details}
              </p>
              {/* <hr className="mt-4" /> */}
              {/* <div className="flex justify-between items-center p-3 py-[14px]">
                <div className="inline-block px-4 py-[10px] text-white font-semibold rounded-full bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] hover:from-[#1e6bb8] hover:to-[#2481ce] transition duration-300">
                  <a
                    href={`https://wa.me/123456789?text=أريد طلب الخدمة: ${service.name}`}
                    className="inline-block text-white font-semibold rounded-lg bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] hover:from-[#1e6bb8] hover:to-[#2481ce] transition duration-300"
                  >
                    طلب الخدمة عبر واتساب
                  </a>
                </div>
                {service?.discount && (
                  <p className="line-through"> ر.س {service?.price}</p>
                )}
                <p className="text-slate-800 font-bold">
                  ر.س{" "}
                  {service?.price - (service?.price * service?.discount) / 100}
                </p>
              </div> */}
            </div>
          ))
        ) : (
          <div className="col-span-3">
            <Loading />
          </div>
        )}
      </div>
      {paginationData && (
        <Pagination
          links={paginationData.links}
          handlePageChange={handlePageChange}
        />
      )}
    </section>
  );
};

export default Posts;
