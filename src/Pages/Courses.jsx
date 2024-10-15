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
const Courses = () => {
  const [services, setServices] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedService, setSelectedService] = useState(null);
  const [selectedService2, setSelectedService2] = useState(null);
  const [loadingMyCourses, setLoadingMyCourses] = useState(false);
  const { t, i18n } = useTranslation();
  const { orderPhone, setCourseContentId } = useContext(AppContext);

  // Fetch all courses
  const fetchAllCourses = async (
    pageUrl = `${BASE_URL}courses?page=${currentPage}`
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
        .get(`${BASE_URL}my/courses?page=${currentPage}`, {
          headers: {
            "Accept-Language": i18n.language,
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("authToken")
            )}`,
          },
        })
        .then((res) => {
          setMyCourses(res?.data?.data);
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
          className="col-span-12 h-[280px] object-cover"
          alt="aboutImage"
        />
        <div className="text-center mb-8 sections-title xl:translate-y-0 lg:translate-y-0 md:translate-y-0 -translate-y-[72px]">
          <h2 className="sections-title">{t("HomePage.Header.courses")}</h2>
        </div>
      </div>
      {/* My Courses Section */}
      {myCourses?.length ? (
        <div className="max-w-[85rem] mx-auto my-12 px-4">
          <h2
            className={`text-3xl font-bold text-gray-600 mb-8 border-b-4 border-[#2481ce] pb-3 mx-auto ${
              i18n.language === "ar" ? "w-[120px]" : "w-[200px]"
            }`}
          >
            {t("courses.myCourses")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px]">
            {!loadingMyCourses ? (
              myCourses?.map((item) => (
                <div
                  className="card shadow-xl rounded-2xl relative overflow-hidden cursor-pointer transform hover:scale-105 duration-300 hover:opacity-90"
                  key={item?.course.id}
                >
                  <div
                    className="relative"
                    onClick={() => openModal(item?.course)}
                  >
                    <img
                      src={`${process.env.REACT_APP_MAIN_URL}/storage/${item?.course?.image}`}
                      className="w-full h-60 object-cover"
                      style={{ borderRadius: "1rem 1rem 0 0" }}
                      alt="My Course"
                    />
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                      <FaPlay className="text-white text-4xl" />
                    </div>
                  </div>
                  <div>
                    <p className="px-6 text-slate-800 font-bold mt-6 mb-3 text-2xl">
                      {item?.course?.name}
                    </p>
                    <p className="flex px-6 text-gray-500 min-h-[160px] detilas-p hover:opacity-75 cursor-pointer">
                      {item?.course?.details}
                    </p>
                  </div>
                  <div className="flex justify-between items-center px-6 py-[14px]">
                    <div className="flex justify-center py-4 mx-auto">
                      <Link
                        className="empty-button transform hover:scale-110 hover:shadow-lg"
                        style={{ borderRadius: "40px", fontSize: "17px" }}
                        to={`/${i18n.language}/courses/content/${item?.course?.id}`}
                        onClick={() => {
                          setCourseContentId(item?.course?.id);
                        }}
                      >
                        {t("courses.courseContent")}
                      </Link>
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
        {myCourses?.length ? (
          <h2
            className={`text-3xl font-bold text-gray-600 mb-8 border-b-4 border-[#2481ce] pb-3 mx-auto ${
              i18n.language === "ar" ? "w-[280px]" : "w-[400px]"
            }`}
          >
            {t("courses.allCourses")}
          </h2>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px]">
          {services.length ? (
            services.map((service) => (
              <div
                className="card shadow-xl rounded-2xl relative overflow-hidden cursor-pointer transform hover:scale-105 duration-300 hover:opacity-90"
                key={service.id}
              >
                {/* Free Badge */}
                {service?.is_free ? (
                  <div className="absolute top-6 -left-12 bg-green-500 text-white font-bold px-2 py-[6px] text-lg transform rotate-[-45deg] shadow-lg w-[200px] text-center z-40">
                    Free
                  </div>
                ) : (
                  <div className="absolute top-6 -left-12 bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] text-white font-bold px-2 py-[6px] text-lg transform rotate-[-45deg] shadow-lg w-[200px] text-center z-40">
                    {service?.price -
                      (service?.price * service?.discount) / 100}{" "}
                    {t("common.currency")}
                  </div>
                )}
                <div className="absolute top-6 -right-12 bg-gradient-to-r from-[#2481ce] to-[#1e6bb8] text-white font-bold px-2 py-[6px] text-lg transform rotate-[45deg] shadow-lg w-[200px] text-center line-through z-40">
                  {service?.price} {t("common.currency")}
                </div>

                <div className="relative" onClick={() => openModal(service)}>
                  <img
                    src={`${process.env.REACT_APP_MAIN_URL}/storage/${service?.image}`}
                    className="w-full h-60 object-cover"
                    style={{ borderRadius: "1rem 1rem 0 0" }}
                    alt="Service"
                  />
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                </div>

                <div>
                  <p className="px-6 text-slate-800 font-bold mt-6 mb-3 text-2xl">
                    {service?.name}
                  </p>
                  <p className="flex px-6 text-gray-500 min-h-[160px] detilas-p hover:opacity-75 cursor-pointer">
                    {service?.details}
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
                      {t("courses.subscribeToCourse")}
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
          onClick={handleBackgroundClick}
        >
          <div className="rounded-xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <video
              controls
              className="w-full h-auto rounded-xl"
              src={`${process.env.REACT_APP_MAIN_URL}/storage/${selectedService?.promotional_video}`}
            />
          </div>
        </div>
      )}

      {selectedService2 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center modal-overlay"
          onClick={handleBackgroundClick2}
        >
          <div
            className="bg-white w-[90%] lg:w-[80%] lg:min-h-[450px] xl:w-[80%] max-w-5xl rounded-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal2}
              className="absolute top-3 right-5 text-4xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <div className="flex flex-col lg:flex-row">
              <div className="xl:w-3/4 lg:w-3/4 w-full py-12 px-6 mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mt-5">
                  {selectedService2.name}
                </h2>
                <p className="mt-4 text-gray-500 px-6 leading-9 min-h-[150px]">
                  {selectedService2.details}
                </p>
                <div className="flex justify-between items-center px-6 py-[14px] mt-10">
                  <a
                    href={`https://wa.me/${orderPhone}?text=${encodeURIComponent(
                      `مرحبا : هل يمكنني طلب هذه الخدمة ${selectedService2?.name}`
                    )}`}
                    target="_blank"
                    className="empty-button transform hover:scale-110 hover:shadow-lg"
                    style={{ borderRadius: "40px", fontSize: "17px" }}
                  >
                    {t("courses.subscribeToCourse")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Courses;
