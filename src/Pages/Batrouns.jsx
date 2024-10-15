import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";
import { CardSceleton } from "../Components/CardSceleton";
import SectionBg from "../public/Images/sections-bg.png";
import { FaPlay } from "react-icons/fa";
import { AppContext } from "../Contexts/AppContext";

const Batrouns = () => {
  const [services, setServices] = useState([]);
  const [myBatrouns, setMyBatrouns] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedService, setSelectedService] = useState(null);
  const [selectedService2, setSelectedService2] = useState(null);
  const [loadingMyCourses, setLoadingMyCourses] = useState(false);
  const { t, i18n } = useTranslation();
  const { orderPhone } = useContext(AppContext);

  // Fetch all courses
  const fetchAllCourses = async (
    pageUrl = `${BASE_URL}batrouns?page=${currentPage}`
  ) => {
    try {
      const response = await axios.get(pageUrl, {
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      const data = response.data.data;
      setServices(data.data); // Service data
      setPaginationData(data); // Pagination data
    } catch (error) {
      console.error("Error fetching Courses :", error);
    }
  };

  // Fetch my courses
  const fetchMyCourses = async () => {
    try {
      setLoadingMyCourses(true);
      await axios
        .get(`${BASE_URL}my/batrouns?page=${currentPage}`, {
          headers: {
            "Accept-Language": i18n.language,
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("authToken")
            )}`,
          },
        })
        .then((res) => {
          setMyBatrouns(res?.data?.data);
          setLoadingMyCourses(false);
        });
    } catch (error) {
      console.error("Error fetching my courses:", error);
      setLoadingMyCourses(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
    fetchAllCourses();
  }, [i18n.language]);

  const handlePageChange = (url) => {
    if (url) {
      fetchAllCourses(url); // Fetch new page
    }
  };

  // Modal functions
  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const openModal2 = (service) => {
    setSelectedService2(service);
  };

  const closeModal2 = () => {
    setSelectedService2(null);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  const handleBackgroundClick2 = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal2();
    }
  };

  return (
    <section
      className="pb-12 bg-gray-50 mt-[64px]"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="relative">
        <img
          src={SectionBg}
          className="col-span-12 h-[280px]"
          alt="aboutImage"
        />
        <div className="text-center mb-8 sections-title">
          <h2 className="sections-title">{t("HomePage.Header.batrouns")}</h2>
        </div>
      </div>

      {/* My Courses Section */}
      {myBatrouns?.length ? (
        <div className="max-w-[85rem] mx-auto my-12 px-4">
          <h2
            className={`text-3xl font-bold text-gray-600 mb-8 border-b-4 border-[#2481ce] pb-3 mx-auto ${
              i18n.language === "ar" ? "w-[120px]" : "w-[200px]"
            }`}
          >
            {t("common.myBatrouns")}
          </h2>
          {console.log(myBatrouns?.batrouns)}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px]">
            {!loadingMyCourses ? (
              myBatrouns?.map((service) => (
                <div
                  className="card shadow-xl rounded-2xl relative overflow-hidden cursor-pointer transform hover:scale-105 duration-300 hover:opacity-90 pt-12"
                  key={service?.id}
                >
                  {/* Free Badge */}
                  {service?.batrouns?.is_free ? (
                    <div className="absolute top-6 -left-12 bg-green-500 text-white font-bold px-2 py-[6px] text-lg transform rotate-[-45deg] shadow-lg w-[200px] text-center">
                      Free
                    </div>
                  ) : (
                    <div className="absolute top-6 -left-12 bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] text-white font-bold px-2 py-[6px] text-lg transform rotate-[-45deg] shadow-lg w-[200px] text-center">
                      {service?.batrouns?.price -
                        (service?.batrouns?.price *
                          service?.batrouns?.discount) /
                          100}
                      {t("common.currency")}
                    </div>
                  )}
                  <div onClick={() => openModal(service)}>
                    <div className="absolute top-6 -right-12 bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] text-white font-bold px-2 py-[6px] text-lg transform rotate-[45deg] shadow-lg w-[200px] text-center line-through">
                      {service?.batrouns?.price} {t("common.currency")}
                    </div>
                    <p className="px-6 text-slate-800 font-bold mt-6 mb-3 text-2xl">
                      {service?.batrouns?.name}
                    </p>
                    <p className="flex px-6 text-gray-500 min-h-[160px] detilas-p hover:opacity-75 cursor-pointer">
                      {service?.batrouns?.details}
                    </p>
                    <div className=" justify-center gap-x-4 mt-8">
                      <p className="flex px-6 text-gray-500  cursor-pointer gap-4 font-semibold">
                        <p className="bg-main text-white w-1/2 rounded-lg flex justify-center items-center px-4 py-1 text-sm">
                          Category : {service?.batrouns?.category?.name}
                        </p>
                        <p className="bg-main text-white w-1/2 rounded-lg flex justify-center items-center px-4 py-1 text-sm">
                          Size : {service?.batrouns?.size?.name}
                        </p>
                      </p>
                    </div>
                  </div>
                  {console.log(service?.batrouns)}
                  <div className="flex justify-between items-center px-6 py-[14px]">
                    <div className="flex justify-center py-4 mx-auto">
                      <a
                        href={`${process.env.REACT_APP_MAIN_URL}/storage/${service?.batrouns?.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="empty-button transform hover:scale-110 hover:shadow-lg"
                        style={{ borderRadius: "40px", fontSize: "17px" }}
                        download={service?.batrouns?.file}
                      >
                        {t("common.downloadBatroun")}
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
        </div>
      ) : null}

      {/* Services Section */}
      <div className="max-w-[85rem] mx-auto my-12 px-4">
        {myBatrouns?.length ? (
          <h2
            className={`text-3xl font-bold text-gray-600 mb-8 border-b-4 border-[#2481ce] pb-3 mx-auto ${
              i18n.language === "ar" ? "w-[320px]" : "w-[400px]"
            }`}
          >
            {t("common.anotherBatrouns")}
          </h2>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px]">
          {services?.length ? (
            services.map((service) => (
              <div
                className="card shadow-xl rounded-2xl relative overflow-hidden cursor-pointer transform hover:scale-105 duration-300 hover:opacity-90 pt-12"
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
                      (service?.price * service?.discount) / 100}
                    {t("common.currency")}
                  </div>
                )}
                <div className="absolute top-6 -right-12 bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] text-white font-bold px-2 py-[6px] text-lg transform rotate-[45deg] shadow-lg w-[200px] text-center line-through">
                  {service?.price} {t("common.currency")}
                </div>
                <p className="px-6 text-slate-800 font-bold mt-6 mb-3 text-2xl">
                  {service?.name}
                </p>
                <p className="flex px-6 text-gray-500 min-h-[160px] detilas-p hover:opacity-75 cursor-pointer">
                  {service?.details}
                </p>

                <div className=" justify-center gap-x-4 mt-8">
                  <p className="flex px-6 text-gray-500  cursor-pointer gap-4 font-semibold">
                    <p className="bg-main text-white w-1/2 rounded-lg flex justify-center items-center px-4 py-1 text-sm">
                      Category : {service?.category?.name}
                    </p>
                    <p className="bg-main text-white w-1/2 rounded-lg flex justify-center items-center px-4 py-1 text-sm">
                      Size : {service?.size?.name}
                    </p>
                  </p>
                </div>
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
            ))
          ) : (
            <div className="col-span-3">
              <CardSceleton />
            </div>
          )}
        </div>
      </div>

      {paginationData && (
        <Pagination
          links={paginationData.links}
          handlePageChange={handlePageChange}
        />
      )}

      {/* Modals */}
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
              {/* Content Section */}
              <div className="w-full py-12 px-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mt-5">
                    {selectedService?.batrouns.name}
                  </h2>
                  <p className="mt-4 text-gray-500 px-6 leading-9 min-h-[150px]">
                    {selectedService?.batrouns.details}
                  </p>
                </div>

                {/* Order Button */}
                <div className="flex justify-between items-center px-6 py-[14px]">
                  <div className="flex justify-center py-4 mx-auto">
                    <a
                      href={`${process.env.REACT_APP_MAIN_URL}/storage/${selectedService?.batrouns?.file}`}
                      className="empty-button transform hover:scale-110 hover:shadow-lg"
                      style={{ borderRadius: "40px", fontSize: "17px" }}
                      target="_blank"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default behavior of opening the file
                        const link = document.createElement("a");
                        link.href = `${process.env.REACT_APP_MAIN_URL}/storage/${selectedService?.batrouns?.file}`;
                        link.setAttribute(
                          "download",
                          selectedService?.batrouns?.file
                        ); // Set a default filename
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link); // Cleanup the link element
                      }}
                    >
                      {t("common.downloadBatroun")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Batrouns;
