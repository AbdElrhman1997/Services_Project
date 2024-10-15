import React, { useEffect, useState } from "react";
import backgroundImage from "../public/Images/CoursesBg.jpg"; // Assuming the image path is correct
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CoursesSection = () => {
  const [courses, setCourses] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t, i18n } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };

  const fetchCourses = async () => {
    const params = {
      dataLimit: 1,
    };
    try {
      const response = await axios.get(`${BASE_URL}courses`, {
        params,
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      setCourses(response?.data?.data?.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [i18n.language]);

  return (
    <section
      className="min-h-screen bg-cover bg-center lg:grid md:grid grid-cols-2 place-content-center pt-8 rtl:text-right ltr:text-left"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="lg:col-span-1 md:col-span-1 mx-auto text-center lg:px-20 md:px-16 px-4 mb-16">
        <p className="text-[#333333] xl:text-5xl lg:text-5xl md:text-5xl text-4xl font-bold">
          {courses[0]?.name}
        </p>
        <p className="text-[#666666] mt-6 mb-16 text-xl font-semibold">
          {courses[0]?.details}
        </p>
        <div className="lg:flex md:flex items-center justify-center gap-x-6">
          <button
            className="empty-button my-4 "
            style={{
              borderRadius: "25px",
              minWidth: "300px",
              padding: "12px 20px",
            }}
            onClick={handleModalToggle} // Toggle modal on button click
          >
            <span className="hover:text-white transition-all duration-200 xl:text-xl lg:text-xl md:text-xl text-xl">
              {t("courses.detailsButton")}
            </span>
          </button>
          <button
            className="empty-button my-4 "
            style={{
              borderRadius: "25px",
              minWidth: "300px",
              padding: "12px 20px",
            }}
          >
            <Link
              to={`/${i18n.language}/courses`}
              className="hover:text-white transition-all duration-200 xl:text-xl lg:text-xl md:text-xl text-xl"
            >
              {t("courses.viewMore")}
            </Link>
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 px-4"
              onClick={handleModalToggle} // Close modal when clicking outside the video
            >
              <div
                className="bg-white p-4 rounded-md"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the video
              >
                <video
                  width="600"
                  controls
                  src={`${process.env.REACT_APP_MAIN_URL}/storage/${courses[0]?.promotional_video}`} // Replace with your actual video path
                  className="rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
