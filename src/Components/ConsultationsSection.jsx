import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";
import { CardSceleton } from "../Components/CardSceleton";
import SectionBg from "../public/Images/sections-bg.png";
import { AppContext } from "../Contexts/AppContext";

const ConsultationsSection = () => {
  const [services, setServices] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedService, setSelectedService] = useState(null); // Modal state
  const { t, i18n } = useTranslation();
  const { orderPhone } = useContext(AppContext);

  // Fetch data from backend
  const fetchServices = async (
    pageUrl = `${BASE_URL}consultations?page=${currentPage}`
  ) => {
    const params = {
      dataLimit: 3,
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

  useEffect(() => {
    fetchServices();
  }, [currentPage, i18n.language]);

  const handlePageChange = (url) => {
    if (url) {
      fetchServices(url); // Fetch new page
    }
  };

  // Open modal function
  const openModal = (service) => {
    setSelectedService(service);
  };

  // Close modal function
  const closeModal = () => {
    setSelectedService(null);
  };

  // Handle closing modal by clicking on background
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <section
      className="pb-12 bg-[#2482ce23] pt-8"
      dir={i18n?.language == "ar" ? "rtl" : "ltr"}
    >
      <div className="text-center mb-8 px-3">
        <h2 className="xl:text-5xl lg:text-5xl md:text-5xl text-3xl font-semibold text-[#2482ced8]">
          {t("consultations.header")}
        </h2>
        <p className="mt-2 xl:text-2xl lg:text-2xl md:text-2xl text-xl font-semibold text-[#2482ced8] mb-4">
          {t("consultations.subheader")}
        </p>
      </div>
      <div className="max-w-[85rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px] my-8 px-4 text-white">
        {services?.length ? (
          services.map((service) => (
            <div
              className="card shadow-xl rounded-2xl relative overflow-hidden cursor-pointer transform hover:scale-105 duration-300 hover:opacity-90 bg-white"
              key={service.id}
            >
              {/* Free Badge */}
              <div onClick={() => openModal(service)}>
                {service?.is_free ? (
                  <div className="absolute top-6 -left-12 bg-green-500 text-white font-bold px-2 py-[6px] text-lg transform rotate-[-45deg] shadow-lg w-[200px] text-center">
                    {t("consultations.free")}
                  </div>
                ) : (
                  <div className="absolute top-6 -left-12 bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] text-white font-bold px-2 py-[6px] text-lg transform rotate-[-45deg] shadow-lg w-[200px] text-center">
                    {service?.price -
                      (service?.price * service?.discount) / 100}{" "}
                    {t("common.currency")}
                  </div>
                )}
                <div className="absolute top-6 -right-12 bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] text-white font-bold px-2 py-[6px] text-lg transform rotate-[45deg] shadow-lg w-[200px] text-center line-through">
                  {service?.price}
                  {t("common.currency")}
                </div>
                {service?.media ? (
                  <img
                    src={`${process.env.REACT_APP_MAIN_URL}/storage/${service?.media}`}
                    className="w-full h-60 object-cover"
                    style={{ borderRadius: "1rem 1rem 0 0" }}
                    alt="batroun_image"
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/500x300"
                    alt="About us"
                    className=" shadow-lg mx-auto"
                    style={{ borderRadius: "1rem 1rem 0 0" }}
                  />
                )}
                <p className="px-6 text-slate-800 font-bold mt-6 mb-3 text-2xl">
                  {service?.name}
                </p>
                <p className="flex px-6 text-gray-500 min-h-[160px] detilas-p hover:opacity-75 cursor-pointer">
                  {service?.details}
                </p>
              </div>
              <div className="flex justify-between items-center px-6 py-[14px] text-[#2482ced8]">
                <div className="flex justify-center py-4 mx-auto">
                  <a
                    href={`https://wa.me/${orderPhone}?text=${encodeURIComponent(
                      `مرحبا : هل يمكنني طلب هذه الخدمة ${service?.name}`
                    )}`}
                    className="empty-button transform hover:scale-110 hover:shadow-lg"
                    target="_blank"
                    style={{ borderRadius: "40px", fontSize: "17px" }}
                  >
                    {t("consultations.orderButton")}
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3">
            <CardSceleton />
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center modal-overlay overflow-auto"
          onClick={handleBackgroundClick} // Handle background click
        >
          <div
            className="bg-white w-[90%] lg:w-[80%] lg:min-h-[450px] xl:w-[80%] max-w-5xl rounded-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal content click from closing the modal
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-5 text-4xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            <div className="flex flex-col lg:flex-row">
              <div className="xl:w-1/2 lg:w-1/2 w-full pt-12 px-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mt-5">
                    {selectedService.name}
                  </h2>
                  <p className="mt-4 text-gray-500 px-3 leading-9 min-h-[150px] xl:max-h-[300px] lg:max-h-[300px] md:max-h-[300px] max-h-[200px] overflow-y-auto text-justify">
                    {selectedService.details}
                  </p>
                </div>

                {/* Order Button */}
                <div className="flex justify-between items-center px-6 py-[14px] mt-4">
                  <div className="flex justify-center py-4 mx-auto">
                    <a
                      href={`https://wa.me/${orderPhone}?text=${encodeURIComponent(
                        `مرحبا : هل يمكنني طلب هذه الخدمة ${selectedService?.name}`
                      )}`}
                      target="_blank"
                      className="empty-button transform hover:scale-110 hover:shadow-lg text-main"
                      style={{ borderRadius: "40px", fontSize: "17px" }}
                    >
                      {t("common.orderViaWhatsapp")}
                    </a>
                  </div>
                </div>
              </div>
              <div className="xl:w-1/2 lg:w-1/2 w-full flex justify-end items-center">
                {selectedService?.media ? (
                  <img
                    src={`${process.env.REACT_APP_MAIN_URL}/storage/${selectedService.media}`}
                    className="xl:w-[460px] lg:w-[460px] md:w-[460px] w-full xl:h-[460px] lg:h-[460px] md:h-[460px] h-[220px] object-cover"
                    alt={selectedService.name}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/500x300"
                    alt="About us"
                    className="rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mx-auto"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConsultationsSection;
