import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import axios from "axios";

const Footer = () => {
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
  }, [i18n.language]);

  const langPrefix = i18n.language === "en" ? "/en" : "/ar";

  return (
    <>
      <footer
        className="test33 text-white pt-8 pb-4 bottom-0 w-full text-center"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <div className="container mx-auto">
          {/* Grid with 5 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links Column */}
            <div>
              <h3 className="text-3xl font-bold mb-4">
                {t("footer.quick_links")}
              </h3>
              <nav className="flex flex-col md:gap-y-4 gap-y-10 items-center">
                <Link
                  to={`${langPrefix}/`}
                  className="hover:text-[#2481ce] text-lg font-semibold"
                >
                  {t("HomePage.Header.home")}
                </Link>
                <Link
                  to={`${langPrefix}/services`}
                  className="hover:text-[#2481ce] text-lg font-semibold"
                >
                  {t("HomePage.Header.ourServices")}
                </Link>
                <Link
                  to={`${langPrefix}/contact`}
                  className="hover:text-[#2481ce] text-lg font-semibold"
                >
                  {t("contact.title")}
                </Link>
                <Link
                  to={`${langPrefix}/courses`}
                  className="hover:text-[#2481ce] text-lg font-semibold"
                >
                  {t("HomePage.Header.courses")}
                </Link>
              </nav>
            </div>
            {/* Contact Column */}
            <div>
              <h3 className="text-3xl font-bold mb-4">
                {t("footer.contact_us")}
              </h3>
              <ul>
                <li className="mb-2">
                  <a
                    href={`https://wa.me/${settingsData?.support_whatsapp}`}
                    target="_blank"
                    className="hover:text-[#2481ce] text-lg text-left"
                  >
                    {settingsData?.support_whatsapp}
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href={`mailto:${settingsData?.email}`}
                    target="_blank"
                    className="hover:text-[#2481ce] text-lg"
                  >
                    {settingsData?.email}
                  </a>
                </li>
              </ul>
            </div>
            {/* Socail Links */}
            <div>
              <h3 className="text-3xl font-bold mb-4">
                {t("footer.socialLinks")}
              </h3>
              <ul className="flex gap-x-6 justify-center">
                <li className="my-2">
                  <a
                    href={`${settingsData?.x}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2481ce] text-lg flex items-center"
                  >
                    <FaTwitter className="mr-2 text-3xl" />
                  </a>
                </li>
                <li className="my-2">
                  <a
                    href={`${settingsData?.intsa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2481ce] text-lg flex items-center"
                  >
                    <FaInstagram className="mr-2 text-3xl" />
                  </a>
                </li>
                <li className="my-2">
                  <a
                    href={`${settingsData?.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2481ce] text-lg flex items-center"
                  >
                    <FaFacebook className="mr-2 text-3xl" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="mt-8 border-t border-[#0a4d73] pt-4 text-center w-full">
          <p className="text-sm">
            {t("footer.copyright")} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
