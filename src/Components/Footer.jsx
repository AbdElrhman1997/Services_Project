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
  }, []);

  const langPrefix = i18n.language === "en" ? "/en" : "/ar";

  return (
    <>
      <footer
        className="bg-gradient-to-r from-[#1a6e9e] to-[#0a4d73] text-white pt-8 pb-4 bottom-0 w-full text-center"
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
      >
        <div className="container mx-auto">
          {/* Grid with 5 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {t("footer.quick_links")}
              </h3>
              <nav className="flex flex-col md:gap-y-4 gap-y-10 pt-4 items-center">
                <Link to={`${langPrefix}/`} className="hover:text-[#2481ce]">
                  {t("HomePage.Header.home")}
                </Link>
                <Link
                  to={`${langPrefix}/services`}
                  className="hover:text-[#2481ce]"
                >
                  {t("HomePage.Header.ourServices")}
                </Link>
                <Link
                  to={`${langPrefix}/consultations`}
                  className="hover:text-[#2481ce]"
                >
                  {t("HomePage.Header.consultations")}
                </Link>
                {/* <Link
                    to={`${langPrefix}/level7`}
                    className="hover:text-[#2481ce]"
                  >
                    {t("HomePage.Header.level7")}
                  </Link>
                  <Link
                    to={`${langPrefix}/posts`}
                    className="hover:text-[#2481ce]"
                  >
                    {t("HomePage.Header.posts")}
                  </Link>
                  <Link
                    to={`${langPrefix}/embroidery`}
                    className="hover:text-[#2481ce]"
                  >
                    {t("HomePage.Header.embroidery")}
                  </Link>
                  <Link
                    to={`${langPrefix}/employment`}
                    className="hover:text-[#2481ce]"
                  >
                    {t("HomePage.Header.employment")}
                  </Link>
                  <Link
                    to={`${langPrefix}/courses`}
                    className="hover:text-[#2481ce]"
                  >
                    {t("HomePage.Header.courses")}
                  </Link>
                  <Link
                    to={`${langPrefix}/products`}
                    className="hover:text-[#2481ce]"
                  >
                    {t("HomePage.Header.products")}
                  </Link>
                  <Link
                    to={`${langPrefix}/batrouns`}
                    className="hover:text-[#2481ce]"
                  >
                    {t("HomePage.Header.batrouns")}
                  </Link> */}
              </nav>
            </div>
            {/* Contact Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {t("footer.contact_us")}
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    to="/support"
                    className="hover:text-gray-300 text-lg text-left"
                  >
                    {settingsData?.support_whatsapp}
                  </Link>
                </li>
                {/* <li className="mb-2">
                    <Link to="/contact" className="hover:text-gray-300 text-lg">
                      {t("footer.email")}
                    </Link>
                  </li> */}
              </ul>
            </div>
            {/* Socail Links */}
            <div>
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
