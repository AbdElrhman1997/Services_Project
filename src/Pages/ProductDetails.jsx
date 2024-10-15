import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../Contexts/AppContext";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import arrow_left from "../public/Images/arrow_left.svg";
import arrow_right from "../public/Images/arrow_right.svg";
import { CardSceleton } from "../Components/CardSceleton";

const ProductDetails = () => {
  const [services, setServices] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedProduct, setSelectedProduct] = useState(null); // Modal state
  const [selectedService, setSelectedService] = useState(null); // Modal state
  const { t, i18n } = useTranslation();
  const { orderPhone } = useContext(AppContext);
  const { id } = useParams();

  // Fetch data from backend
  const fetchServices = async (
    pageUrl = `${BASE_URL}product/details/${id}`
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
      const data = response?.data?.data;
      console.log(response?.data?.data);
      setSelectedProduct(data);
      setServices(data); // Service data
      setPaginationData(data); // Pagination data
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentPage, i18n.language]);

  const openModal = (service) => {
    setSelectedService(service);
  };

  // Close modal function
  const closeModal = () => {
    setSelectedService(null);
  };

  // Handle closing modal by clicking on background
  const handleBackgroundClick = (e) => {
    // Check if the clicked area is the background (outside the modal content)
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div
      className="bg-white mt-32 mb-20"
      onClick={(e) => e.stopPropagation()} // Prevent modal content click from closing the modal
      dir={i18n.language === "en" ? "ltr" : "rtl"}
    >
      <div className="grid grid-cols-12 ">
        <div className="xl:col-span-5 lg:col-span-5 col-span-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 ">
              {selectedProduct?.product?.name}
            </h2>
            <p className="mt-4 text-gray-500 px-6 leading-9 min-h-[150px] text-justify">
              {selectedProduct?.product?.details}
            </p>
          </div>

          {/* <div className="flex justify-between items-center px-6 py-[14px] mt-10">
            <div className="flex justify-center py-4 mx-auto">
              <a
                href={`https://wa.me/${orderPhone}`}
                className="empty-button transform hover:scale-110 hover:shadow-lg"
                style={{ borderRadius: "40px", fontSize: "17px" }}
              >
                طلب المنتج عبر واتساب
              </a>
            </div>
          </div> */}
        </div>
        {/* <div className="xl:w-1/2 lg:w-1/2 w-full"></div> */}
        <div className="xl:col-span-7 lg:col-span-7 col-span-12 xl:my-0 lg:my-0 md:my-0 my-8">
          <div className="relative flex justify-between items-center ">
            {i18n.language === "en" ? (
              <div
                className="custom-next-arrow z-10 cursor-pointer p-4 "
                id="custom-prev"
              >
                <img
                  src={arrow_left}
                  alt=""
                  className="xl:w-[200px] lg:w-[200px] md:w-[200px] sm:w-[160px] w-[120px] opacity-70 hover:opacity-100"
                />
              </div>
            ) : (
              <div
                className="custom-next-arrow z-10 cursor-pointer p-4"
                id="custom-next"
              >
                <img
                  src={arrow_right}
                  alt=""
                  className="xl:w-[200px] lg:w-[200px] md:w-[200px] sm:w-[160px] w-[120px] opacity-70 hover:opacity-100"
                />
              </div>
            )}
            <Swiper
              slidesPerView={1}
              navigation={{
                prevEl: "#custom-prev",
                nextEl: "#custom-next",
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper  mx-auto"
              loop={true}
            >
              {selectedProduct?.product?.media?.map((item) => {
                return (
                  <SwiperSlide key={item?.id} className="">
                    {item?.image ? (
                      <img
                        src={`${process.env.REACT_APP_MAIN_URL}/${item?.image}`}
                        className="w-full h-full object-cover "
                        alt={selectedProduct?.product?.name}
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/500x300"
                        alt="About us"
                        className="rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mx-auto"
                      />
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
            {i18n.language === "en" ? (
              <div
                className="custom-next-arrow z-10 cursor-pointer p-4"
                id="custom-next"
              >
                <img
                  src={arrow_right}
                  alt=""
                  className="xl:w-[200px] lg:w-[200px] md:w-[200px] sm:w-[160px] w-[120px] opacity-70 hover:opacity-100"
                />
              </div>
            ) : (
              <div
                className="custom-next-arrow z-10 cursor-pointer p-4 "
                id="custom-prev"
              >
                <img
                  src={arrow_left}
                  alt=""
                  className="xl:w-[200px] lg:w-[200px] md:w-[200px] sm:w-[160px] w-[120px] opacity-70 hover:opacity-100"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-4xl font-bold mt-12 mb-8 text-main">
        {t("services.services_title")}
      </div>
      <div className="max-w-[85rem] mx-auto grid grid-cols-12  gap-8 min-h-[200px] my-12 px-4">
        {selectedProduct?.Services?.data?.length ? (
          <>
            {selectedProduct?.Services?.data?.map((service) => (
              <div
                className="card shadow-xl rounded-2xl relative overflow-hidden cursor-pointer transform hover:scale-105 duration-300 hover:opacity-90 xl:col-span-4 lg:col-span-4 md:col-span-6 col-span-12"
                onClick={() => openModal(service)} // Open modal when card clicked
                key={service.id}
              >
                {/* Free Badge */}
                {service?.is_free ? (
                  <div className="absolute top-6 -left-12 bg-green-500 text-white font-bold px-2 py-[6px] text-lg transform rotate-[-45deg] shadow-lg w-[200px] text-center">
                    Free
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
                <div className="flex justify-between items-center px-6 py-[14px]">
                  <div className="flex justify-center py-4 mx-auto">
                    <a
                      href={`https://wa.me/${orderPhone}?text=${encodeURIComponent(
                        `مرحبا : هل يمكنني طلب هذه الخدمة ${service?.name}`
                      )}`}
                      target="_blank"
                      className="empty-button transform hover:scale-110 hover:shadow-lg"
                      style={{ borderRadius: "40px", fontSize: "17px" }}
                    >
                      {t("common.orderViaWhatsapp")}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
      {selectedService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center modal-overlay"
          dir="ltr"
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
              <div className="xl:w-1/2 lg:w-1/2 w-full">
                {selectedService?.media ? (
                  <img
                    src={`${process.env.REACT_APP_MAIN_URL}/storage/${selectedService.media}`}
                    className=" w-full h-full object-cover"
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
              {/* Content Section */}
              <div className="xl:w-1/2 lg:w-1/2 w-full py-12 px-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mt-5">
                    {selectedService.name}
                  </h2>
                  <p className="mt-4 text-gray-500 px-6 leading-9 min-h-[150px]">
                    {selectedService.details}
                  </p>
                </div>

                {/* Order Button */}
                <div className="flex justify-between items-center px-6 py-[14px] mt-10">
                  <div className="flex justify-center py-4 mx-auto">
                    <a
                      href={`https://wa.me/${orderPhone}?text=${encodeURIComponent(
                        `مرحبا : هل يمكنني طلب هذه الخدمة ${selectedService?.name}`
                      )}`}
                      target="_blank"
                      className="empty-button transform hover:scale-110 hover:shadow-lg"
                      style={{ borderRadius: "40px", fontSize: "17px" }}
                    >
                      {t("common.orderViaWhatsapp")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
