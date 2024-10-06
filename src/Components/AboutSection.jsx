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
  }, []);
  return (
    <section
      className="min-h-[calc(100vh-64px)] py-16 px-6 bg-gray-100 flex items-center rtl:text-right ltr:text-left"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Text on the Right */}
        <div className="md:w-1/2 w-full md:pl-12 text-center">
          {/* Title */}
          <h2 className="text-4xl font-extrabold mb-6 text-[#2481ce]">
            {t("about.title")}
          </h2>

          {/* Divider */}
          <div className="h-1 w-20 bg-[#2481ce] mb-6 mx-auto"></div>

          {/* Description */}
          <p className="text-lg text-gray-700  mx-4 min-h-[200px]">
            {aboutData?.details}
          </p>

          {/* Call to Action */}
          <Link
            to={`/${i18n.language}/about`}
            className="inline-block px-8 py-3 my-8 bg-[#2481ce] text-white font-semibold rounded-full shadow-md hover:bg-[#1c669b] transition duration-300 text-lg"
          >
            {t("about.cta")}
          </Link>
        </div>

        <div className="md:w-1/2 w-full mb-8 md:mb-0 relative">
          {aboutData?.image ? (
            <img
              src={`http://195.35.37.105:200/storage/${aboutData?.image}`}
              alt="About us"
              className="rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mx-auto"
            />
          ) : (
            <img
              src="https://via.placeholder.com/500x300"
              alt="About us"
              className="rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mx-auto"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
