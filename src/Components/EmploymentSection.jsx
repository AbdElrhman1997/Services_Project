import React, { useEffect, useState } from "react";
import backgroundImage from "../public/Images/CoursesBg.jpg"; // Assuming the image path is correct
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ApplyJobModal from "./ApplyJobModal";

const EmploymentSection = () => {
  const [employment, setEmployment] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t, i18n } = useTranslation();
  const [applyModal, setApplyModal] = useState(false);

  const fetchEmployments = async () => {
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
      setEmployment(response?.data?.data?.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchEmployments();
  }, [i18n.language]);

  const handleBackgroundApplyClick = (e) => {
    // Check if the clicked area is the background (outside the modal content)
    if (e.target.classList.contains("modal-overlay")) {
      closeApplyModal();
    }
  };

  const openApplyModal = (service) => {
    setApplyModal(service);
  };

  // Close modal function
  const closeApplyModal = () => {
    setApplyModal(null);
  };

  return (
    <section
      className="employement-section "
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="lg:px-16 md:px-16 px-5">
        <div className="lg:grid md:grid grid-cols-12 gap-x-6 mx-auto w-fit items-center">
          <div className="lg:col-span-6 md:col-span-6 col-span-12 lg:px-16 md:px-16 px-5 my-auto text-white">
            <p
              className="xl:text-4xl lg:text-4xl md:text-4xl text-2xl"
              style={{ fontWeight: "bold" }}
            >
              {employment[0]?.name}
            </p>
            <p className="text-xl detilas-p"> {employment[0]?.details}</p>
          </div>
          <div className="lg:col-span-6 md:col-span-6 col-span-12 lg:block md:block flex justify-center">
            {/* Filled button */}
            <button
              onClick={openApplyModal}
              className="bg-[#2481ce] text-white xl:text-xl lg:text-xl md:text-xl text-base m-2 lg:px-8 md:px-8 px-2 py-3 rounded-full transition duration-300 hover:bg-[#1c669b] font-bold lg:min-w-[220px] md:min-w-[220px] min-w-[50%]"
            >
              {t("employment.applyNow")}
            </button>

            {/* Empty button */}
            <button className="bg-[#2481ce] text-white xl:text-xl lg:text-xl md:text-xl text-base m-2  lg:px-8 md:px-8 px-2  py-3 rounded-full transition duration-300 hover:bg-[#1c669b] font-bold lg:min-w-[220px] md:min-w-[220px] min-w-[50%] ">
              <Link to={`/${i18n.language}/employment`}>
                {t("employment.moreJobs")}
              </Link>
            </button>
          </div>
        </div>
      </div>
      {applyModal && (
        <ApplyJobModal
          handleBackgroundApplyClick={handleBackgroundApplyClick}
          closeApplyModal={closeApplyModal}
          employment_id={employment[0]?.id}
        />
      )}
    </section>
  );
};

export default EmploymentSection;
