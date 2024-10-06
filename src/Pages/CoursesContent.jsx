import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Pagination from "../Components/Pagination";
import Loading from "../Components/Loading";
import { CardSceleton } from "../Components/CardSceleton";
import SectionBg from "../public/Images/sections-bg.png";
import { FaPlay } from "react-icons/fa";
import { AppContext } from "../Contexts/AppContext";

const CoursesContent = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [myCourseData, setMyCourseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [selectedService, setSelectedService] = useState(null);
  const [selectedService2, setSelectedService2] = useState(null);
  const [loadingMyCourses, setLoadingMyCourses] = useState(false);
  const { t, i18n } = useTranslation();
  const { orderPhone } = useContext(AppContext);
  const { id } = useParams();
  // Fetch all courses
  const fetchCourseContent = async (
    pageUrl = `${BASE_URL}my/courses/content/${id}?page=${currentPage}`
  ) => {
    setLoadingMyCourses(true);
    try {
      await axios
        .get(pageUrl, {
          headers: {
            "Accept-Language": i18n.language,
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("authToken")
            )}`,
          },
        })
        .then((response) => {
          setMyCourses(response?.data?.data[0]?.course?.content); // Service data
          setMyCourseData(response?.data?.data[0]?.course);
          setLoadingMyCourses(false);
          // setPaginationData(response?.data?.data); // Pagination data
        });
    } catch (error) {
      setLoadingMyCourses(false);
      console.error("Error fetching Courses :", error);
    }
  };

  useEffect(() => {
    fetchCourseContent();
  }, []);

  const handlePageChange = (url) => {
    if (url) {
      fetchCourseContent(url); // Fetch new page
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
          <h2 className="sections-title">
            {t("courses.course")} {myCourseData?.name}
          </h2>
        </div>
      </div>

      {/* My Courses Section */}
      <div className="max-w-[85rem] mx-auto my-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[200px]">
          {loadingMyCourses ? (
            <div className="col-span-3">
              <CardSceleton />
            </div>
          ) : (
            myCourses?.map((item) => (
              <div
                className="card shadow-xl rounded-2xl relative overflow-hidden cursor-pointer transform hover:scale-105 duration-300 hover:opacity-90 pb-6"
                key={item?.id}
              >
                <div className="relative" onClick={() => openModal(item)}>
                  <img
                    src={`http://195.35.37.105:200/storage/${item?.image}`}
                    className="w-full h-60 object-cover"
                    style={{ borderRadius: "1rem 1rem 0 0" }}
                    alt="My Course"
                  />
                  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <FaPlay className="text-white text-4xl" />
                  </div>
                </div>
                <div
                  onClick={() => {
                    openModal2(item);
                  }}
                >
                  <p className="px-6 text-slate-800 font-bold mt-6 mb-3 text-2xl">
                    {item?.name}
                  </p>
                  <p className="flex px-6 text-gray-500 min-h-[160px] detilas-p hover:opacity-75 cursor-pointer">
                    {item?.details}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* {paginationData && (
        <Pagination
          links={paginationData.links}
          handlePageChange={handlePageChange}
        />
      )} */}

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
              src={`http://195.35.37.105:200/storage/${selectedService?.media}`}
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
            className="bg-white w-[90%] lg:w-[80%]  xl:w-[80%] max-w-5xl rounded-lg overflow-hidden relative"
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
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoursesContent;
