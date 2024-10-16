import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AboutSection = () => {
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
        <div className=" md:w-1/2 w-full md:pl-12  px-6 pt-20">
          {/* Title */}
          <h2 className="xl:text-4xl lg:text-4xl md:text-4xl text-3xl font-extrabold mb-6 text-[#212529] xl:mx-4 lg:mx-4 md:mx-4 mx-auto border-b-[4px] border-main pb-3 w-fit">
            {t("about.title")}
          </h2>

          {/* Divider */}
          {/* <div className="h-1 w-20 bg-[#2481ce] mb-6"></div> */}

          {/* Description */}
          <p className="text-base text-black  mx-4 leading-loose font-semibold text-justify detilas-p-2">
            {aboutData?.details}
          </p>

          {/* Call to Action */}
          <Link
            to={`/${i18n.language}/about`}
            className="block px-8 py-3 my-8 bg-[#2482ced8] text-white font-semibold shadow-md hover:bg-main_hover transition duration-300 xl:text-2xl lg:text-2xl md:text-2xl text-xl w-fit mt-10 xl:mx-4 lg:mx-4 md:mx-4 mx-auto"
          >
            {t("about.cta")}
          </Link>
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

export default AboutSection;
