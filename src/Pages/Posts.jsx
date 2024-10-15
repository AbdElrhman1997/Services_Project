import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";
import { CardSceleton } from "../Components/CardSceleton";
import SectionBg from "../public/Images/sections-bg.png";
import ImageContainer from "../Components/ImageContainer";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedService, setSelectedService] = useState(null); // Modal state
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [dataLimit, setDataLimit] = useState(3);
  const [totalServices, setTotalServices] = useState(0);
  // Fetch data from backend
  const fetchServices = async (
    pageUrl = `${BASE_URL}posts?page=${currentPage}`
  ) => {
    const params = {
      dataLimit: dataLimit,
    };
    try {
      setLoading(true);
      axios
        .get(pageUrl, {
          params,
          headers: {
            "Accept-Language": i18n.language,
          },
        })
        .then((response) => {
          const data = response?.data?.data;
          setTotalServices(data?.total);
          setPosts(data?.data);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [currentPage, dataLimit, i18n.language]);

  const handlePageChange = (url) => {
    if (url) {
      fetchServices(url); // Fetch new page
    }
  };

  const openModal = (service) => setSelectedService(service);
  const closeModal = () => setSelectedService(null);

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  function formatDateToArabic(dateString) {
    const daysOfWeek = [
      t("posts.days.sunday"),
      t("posts.days.monday"),
      t("posts.days.tuesday"),
      t("posts.days.wednesday"),
      t("posts.days.thursday"),
      t("posts.days.friday"),
      t("posts.days.saturday"),
    ];
    const months = [
      t("posts.months.january"),
      t("posts.months.february"),
      t("posts.months.march"),
      t("posts.months.april"),
      t("posts.months.may"),
      t("posts.months.june"),
      t("posts.months.july"),
      t("posts.months.august"),
      t("posts.months.september"),
      t("posts.months.october"),
      t("posts.months.november"),
      t("posts.months.december"),
    ];

    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const period = hours >= 12 ? t("posts.time.pm") : t("posts.time.am");
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${dayOfWeek}، ${dayOfMonth} ${month} ${year} ${hours}:${minutes} ${period}`;
  }

  return (
    <section className="pb-12 bg-gray-50 mt-[64px] relative" dir="rtl">
      <div className="relative">
        <img
          src={SectionBg}
          className="col-span-12 h-[280px] object-cover"
          alt={t("posts.alt.aboutImage")}
        />
        <div className="text-center mb-8 sections-title xl:translate-y-0 lg:translate-y-0 md:translate-y-0 -translate-y-6">
          <h2 className="sections-title">{t("posts.title")}</h2>
        </div>
      </div>

      <div className="grid grid-cols-12 mb-12">
        <div className="xl:col-span-3 lg:col-span-3 md:col-span-2 top-[200px] left-0 w-[200px] text-center bg-red">
          {/* Advertisement placeholder */}
        </div>

        <div className="xl:col-span-6 lg:col-span-6 md:col-span-8 col-span-12 max-w-[85rem] mx-auto grid grid-cols-12 sm:grid-cols-12 lg:grid-cols-12 gap-y-8 min-h-[100%] my-12 px-6">
          {posts?.length ? (
            posts.map((service) => (
              <div
                key={service.id}
                className="col-span-12 grid grid-cols-12 bg-white shadow-xl px-1"
              >
                <div className="flex items-center space-x-3 px-4 col-span-12 pt-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYnsoJKGMaangFJ0fH0LS_f-BhjwV8WEhdgg&s"
                    alt={t("posts.alt.profileImage")}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150/000000/FFFFFF/?text=No+Image";
                    }}
                  />
                  <div>
                    <p className="font-semibold text-[#050505] text-2xl mx-4">
                      {service?.name}
                    </p>
                  </div>
                </div>
                <div className="mt-3 col-span-12 text-justify mx-4">
                  <h3 className="text-lg font-semibold min-h-[100px]">
                    <p className="text-[#050505]">{service?.details}</p>
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDateToArabic(service?.created_at)}
                  </span>
                </div>
                <ImageContainer media={service?.media} />
              </div>
            ))
          ) : (
            <div className="col-span-12 min-w-[600px]">
              <div className="col-span-12 grid grid-cols-12 bg-white shadow-xl rounded-xl animate-pulse">
                <div className="flex items-center space-x-3 px-4 col-span-12 pt-4">
                  {/* Profile Image Skeleton */}
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  {/* Profile Name Skeleton */}
                  <div>
                    <div className="h-5 bg-gray-300 rounded w-24 mx-4"></div>
                  </div>
                </div>

                {/* Text content Skeleton */}
                <div className="mt-3 col-span-12 text-justify mx-4">
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                </div>

                {/* Image Section Skeleton */}
                <div className="col-span-12 grid grid-cols-12 mt-8 gap-4">
                  <div className="col-span-12 h-32 bg-gray-300 rounded min-h-[300px]"></div>
                </div>
              </div>
            </div>
          )}
          {posts?.length < totalServices ? (
            <div
              onClick={() => {
                setDataLimit((prev) => prev + 3);
              }}
              className="col-span-12 text-main font-semibold text-3xl mx-auto cursor-pointer hover:opacity-80"
            >
              قراءة المزيد ...
            </div>
          ) : null}
        </div>

        <div className="xl:col-span-3 lg:col-span-3 md:col-span-2 top-[200px] right-0 w-[200px] text-center"></div>
      </div>

      {selectedService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center modal-overlay"
          dir="ltr"
          onClick={handleBackgroundClick}
        >
          <div
            className="bg-white w-[90%] lg:w-[80%] lg:min-h-[450px] xl:w-[80%] max-w-5xl rounded-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
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
                    src={`${process.env.REACT_APP_MAIN_URL}/${selectedService.media}`}
                    className="w-full h-full object-cover"
                    alt={selectedService.name}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/500x300"
                    alt={t("posts.alt.serviceImage")}
                    className="rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mx-auto"
                  />
                )}
              </div>
              <div className="xl:w-1/2 lg:w-1/2 w-full py-12 px-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mt-5">
                    {selectedService.name}
                  </h2>
                  <p className="mt-4 text-gray-500 px-6 leading-9 min-h-[150px]">
                    {selectedService.details}
                  </p>
                </div>

                <div className="flex justify-between items-center px-6 py-[14px] mt-10">
                  <div className="flex justify-center py-4 mx-auto">
                    <a
                      href={`https://wa.me/123456789?text=${t(
                        "posts.whatsappOrderText"
                      )}`}
                      target="_blank"
                      className="empty-button transform hover:scale-110 hover:shadow-lg"
                      style={{ borderRadius: "40px", fontSize: "17px" }}
                    >
                      {t("posts.orderServiceWhatsApp")}
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

export default Posts;
