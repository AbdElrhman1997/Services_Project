import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const About = () => {
  const { t, i18n } = useTranslation();
  const [aboutData, setAboutData] = useState();

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}about`,
          {
            headers: {
              "Accept-Language": i18n.language,
            },
          }
        );
        const data = JSON.stringify(response?.data?.data, null, 2);
        setAboutData(JSON.parse(data));
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, [i18n.language]);
  return (
    <section
      className={`flex items-center ${
        i18n.language === "ar" ? "text-right" : "text-left"
      }`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className=" mx-auto flex flex-col md:flex-row items-center h-full justify-between">
        {/* Text on the Right */}
        <div className=" md:w-1/2 w-full md:pl-12  px-6 pt-20 mt-6 mb-12">
          {/* Title */}
          <h2 className="text-4xl font-extrabold mb-6 text-[#212529] mx-4 border-b-[4px] border-main pb-3 w-fit">
            {t("about.title")}
          </h2>

          {/* Divider */}
          {/* <div className="h-1 w-20 bg-[#2481ce] mb-6"></div> */}

          {/* Description */}
          <p className="text-base text-black  mx-4 leading-loose font-semibold text-justify min-h-[200px]">
            {aboutData?.details}
          </p>
        </div>
        <div className=" md:w-1/2 w-full mb-8 md:mb-0 relative pt-10">
          {aboutData?.image ? (
            <img
              src={`${process.env.REACT_APP_MAIN_URL}/storage/${aboutData?.image}`}
              alt="About us"
              className="  object-cover"
              style={{ backgroundPosition: "50%" }}
            />
          ) : (
            <img
              src="https://via.placeholder.com/500x300"
              alt="About us"
              className=" transform transition duration-500 hover:scale-105 mx-auto"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
