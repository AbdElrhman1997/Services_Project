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

const Level7 = () => {
  const [services, setServices] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedService, setSelectedService] = useState(null);
  const [selectedService2, setSelectedService2] = useState(null);
  const { t, i18n } = useTranslation();
  const { orderPhone } = useContext(AppContext);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch data from backend
  const fetchServices = async (
    pageUrl = `${BASE_URL}level7/video?page=${currentPage}`
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

  const openModal2 = (service) => {
    setSelectedService2(service);
  };

  // Close modal function
  const closeModal2 = () => {
    setSelectedService2(null);
  };

  // Handle closing modal by clicking on background
  const handleBackgroundClick = (e) => {
    // Check if the clicked area is the background (outside the modal content)
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };
  const handleBackgroundClick2 = (e) => {
    // Check if the clicked area is the background (outside the modal content)
    if (e.target.classList.contains("modal-overlay")) {
      closeModal2();
    }
  };

  // Function to check if the media is a video
  const isVideo = (media) => {
    const videoFormats = [".mp4", ".webm", ".ogg"];
    return videoFormats.some((format) => media.endsWith(format));
  };

  return (
    <section className="pb-12 bg-gray-50 mt-[64px]" dir="rtl">
      <div className="relative">
        <img
          src={SectionBg}
          className=" col-span-12 h-[280px] object-cover"
          alt="aboutImage"
        />
        <div className="text-center mb-8 sections-title xl:translate-y-0 lg:translate-y-0 md:translate-y-0 -translate-y-6">
          <h2 className="sections-title">Level7</h2>
        </div>
      </div>

      <div className="max-w-[85rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px] my-12 px-4 ">
        {services?.length ? (
          services?.map((service) => (
            <div
              className="card shadow-xl rounded-2xl relative overflow-hidden cursor-pointer transform hover:scale-105 duration-300 hover:opacity-90"
              key={service.id}
            >
              {/* Free Badge */}
              {/* {service?.is_free ? (
                <div className="absolute top-6 -left-12 bg-green-500 text-white font-bold px-2 py-[6px] text-lg transform rotate-[-45deg] shadow-lg w-[200px] text-center">
                  Free
                </div>
              ) : (
                <div className="absolute top-6 -left-12 bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] text-white font-bold px-2 py-[6px] text-lg transform rotate-[-45deg] shadow-lg w-[200px] text-center">
                  {service?.price - (service?.price * service?.discount) / 100}{" "}
                  ر.س
                </div>
              )}
              <div className="absolute top-6 -right-12 bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] text-white font-bold px-2 py-[6px] text-lg transform rotate-[45deg] shadow-lg w-[200px] text-center line-through">
                {service?.price} ر.س
              </div> */}

              {/* Image or Video Handling */}
              {isVideo(service?.media) ? (
                <div className="relative" onClick={() => openModal(service)}>
                  <video
                    className="w-full h-60 rounded-xl "
                    src={`${process.env.REACT_APP_MAIN_URL}/${service?.media}`}
                  />
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                </div>
              ) : (
                <img
                  src={`${process.env.REACT_APP_MAIN_URL}/${service?.media}`}
                  className="w-full h-60 object-cover"
                  onClick={() => openModal2(service)}
                  style={{ borderRadius: "1rem 1rem 0 0" }}
                  alt="Property"
                />
              )}

              <div
                onClick={() => {
                  openModal2(service);
                }}
              >
                <p className="px-6 text-slate-800 font-bold mt-6 mb-3 text-2xl">
                  {service?.name}
                </p>
                <p className="flex px-6 text-gray-500 min-h-[160px] detilas-p hover:opacity-75 cursor-pointer">
                  {service?.details}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3">
            <CardSceleton />
          </div>
        )}
      </div>

      {paginationData && (
        <Pagination
          links={paginationData.links}
          handlePageChange={handlePageChange}
        />
      )}

      {selectedService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center modal-overlay"
          onClick={handleBackgroundClick}
        >
          <div className="rounded-xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            {/* Close button */}
            {/* <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              ✕
            </button> */}
            <video
              controls
              className="w-full h-auto rounded-xl "
              src={`${process.env.REACT_APP_MAIN_URL}/${selectedService?.media}`}
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedService2 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center modal-overlay"
          dir="ltr"
          onClick={handleBackgroundClick2} // Handle background click
        >
          <div
            className="bg-white w-[90%] lg:w-[80%] lg:min-h-[450px] xl:w-[80%] max-w-5xl rounded-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal content click from closing the modal
          >
            <button
              onClick={closeModal2}
              className="absolute top-3 right-5 text-4xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* <div className="xl:w-1/2 lg:w-1/2 w-full">
                {isVideo(selectedService2?.media) ? (
                  <div className="relative">
                    <video
                      controls
                      className="w-full h-full rounded-xl bg-white"
                      src={`${process.env.REACT_APP_MAIN_URL}/${selectedService2?.media}`}
                    />
                  </div>
                ) : (
                  <img
                    src={`${process.env.REACT_APP_MAIN_URL}/${selectedService2?.media}`}
                    className="w-full h-60 object-cover"
                    onClick={() => openModal2(selectedService2)}
                    style={{ borderRadius: "1rem 1rem 0 0" }}
                    alt="Property"
                  />
                )}
              </div> */}
              <div className="xl:w-3/4 lg:w-3/4 w-full py-12 px-6 mx-auto">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mt-5">
                    {selectedService2.name}
                  </h2>
                  <p className="mt-4 text-gray-500 px-6 leading-9 min-h-[150px]">
                    {selectedService2.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Level7;
