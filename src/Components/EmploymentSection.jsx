import React, { useEffect, useState } from "react";
import backgroundImage from "../public/Images/CoursesBg.jpg"; // Assuming the image path is correct
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EmploymentSection = () => {
  const [employment, setEmployment] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t, i18n } = useTranslation();

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
  }, []);

  return (
    <section
      className="employement-section rtl:text-right ltr:text-left"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="lg:px-16 md:px-16 px-5">
        <div className="lg:grid md:grid grid-cols-12 gap-6 mx-auto w-fit items-center">
          <div className="lg:col-span-6 md:col-span-6 col-span-12 lg:px-16 md:px-16 px-5 my-auto text-white">
            <p className="text-4xl mb-8" style={{ fontWeight: "bold" }}>
              {employment[0]?.name}
            </p>
            <p className="text-xl my-3 detilas-p"> {employment[0]?.details}</p>
          </div>
          <div className="lg:col-span-6 md:col-span-6 col-span-12 lg:block md:block flex justify-center">
            {/* Filled button */}
            <button className="bg-[#2481ce] text-white text-xl m-2 lg:px-8 md:px-8 px-2 py-3 rounded-full transition duration-300 hover:bg-[#1c669b] font-bold lg:min-w-[220px] md:min-w-[220px] min-w-[50%]">
              <a href="/ar/sponsor#sponserForm">{t("employment.applyNow")}</a>
            </button>

            {/* Empty button */}
            <button className="bg-[#2481ce] text-white text-xl m-2  lg:px-8 md:px-8 px-2  py-3 rounded-full transition duration-300 hover:bg-[#1c669b] font-bold lg:min-w-[220px] md:min-w-[220px] min-w-[50%] ">
              <a href="/ar/sponsor#sponserForm">{t("employment.moreJobs")}</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmploymentSection;
