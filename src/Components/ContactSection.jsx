import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const ContactSection = () => {
  const { t, i18n } = useTranslation();

  const [settingsData, setSettingsData] = useState();

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}setting`,
          {
            headers: {
              "Accept-Language": i18n.language,
            },
          }
        );
        const data = JSON.stringify(response?.data?.data, null, 2);
        setSettingsData(JSON.parse(data));
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  return (
    <section
      className="py-16 px-6 bg-gray-100 rtl:text-right ltr:text-left"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-63 text-[#2481ce]">
          {t("contact.title")}
        </h2>

        {/* Section Description */}
        <p className="text-lg mb-8 text-gray-700">{t("contact.description")}</p>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800 mb-10">
          {/* Email */}
          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#2481ce]">
            <h3 className="text-2xl font-semibold mb-4">
              {t("contact.emailTitle")}
            </h3>
            <p>{t("contact.email")}</p>
          </div>
          {/* Phone */}
          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#2481ce]">
            <h3 className="text-2xl font-semibold mb-4">
              {t("contact.phoneTitle")}
            </h3>
            <p>{settingsData?.support_whatsapp}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#2481ce]">
            <h3 className="text-xl font-semibold mb-4">
              {t("footer.socialLinks")}
            </h3>
            <ul className="flex gap-x-6 justify-center">
              <li className="my-2">
                <a
                  href={`${settingsData?.x}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 text-lg flex items-center"
                >
                  <FaTwitter className="mr-2 text-3xl" />
                </a>
              </li>
              <li className="my-2">
                <a
                  href={`${settingsData?.insta}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 text-lg flex items-center"
                >
                  <FaInstagram className="mr-2 text-3xl" />
                </a>
              </li>
              <li className="my-2">
                <a
                  href={`${settingsData?.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 text-lg flex items-center"
                >
                  <FaFacebook className="mr-2 text-3xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action Button */}
        <button className="bg-[#2481ce] text-white px-8 py-4 rounded-full hover:bg-[#1c669b] transition duration-300">
          <a
            href={`tel:${settingsData?.support_whatsapp}`}
            className="hover:text-gray-300 text-lg"
          >
            {t("contact.ctaButton")}
          </a>
        </button>

        {/* Social Media */}
        <div className="mt-8 flex justify-center gap-6">
          {/* Example Social Icons */}
          <a
            href="#"
            className="text-[#2481ce] hover:text-[#1c669b] transition"
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a
            href="#"
            className="text-[#2481ce] hover:text-[#1c669b] transition"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a
            href="#"
            className="text-[#2481ce] hover:text-[#1c669b] transition"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
