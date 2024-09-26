import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const handleScroll = () => {
    const header = document.getElementById("header");
    if (window.scrollY > 80) {
      header?.classList.add("bg-white", "text-gray-600", "shadow-md");
      header?.classList.remove("bg-[#00000036]", "text-white");
    } else {
      header?.classList.add("bg-[#00000036]", "text-white");
      header?.classList.remove("bg-white", "shadow-md", "text-gray-600");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLanguageChange = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
  };

  // Determine the language prefix
  const langPrefix = i18n.language === "en" ? "/en" : "/ar";

  return (
    <header
      id="header"
      className="fixed w-full top-0 left-0 z-50 transition-all duration-300 bg-[#00000036] text-white font-semibold"
      dir={i18n.language === "en" ? "ltr" : "rtl"}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Language Toggle Button */}
        <div className="flex items-center">
          <button className="empty-button">
            <Link to={`${langPrefix}/login`} className="hover:text-gray-300">
              {t("HomePage.Header.login")}
            </Link>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-x-8 justify-center items-center">
          <Link to={`${langPrefix}/`} className="hover:text-gray-300">
            {t("HomePage.Header.home")}
          </Link>
          <Link to={`${langPrefix}/about`} className="hover:text-gray-300">
            {t("HomePage.Header.aboutUs")}
          </Link>
          <Link to={`${langPrefix}/services`} className="hover:text-gray-300">
            {t("HomePage.Header.ourServices")}
          </Link>
          <Link
            to={`${langPrefix}/consultations`}
            className="hover:text-gray-300"
          >
            {t("HomePage.Header.consultations")}
          </Link>
          <Link to={`${langPrefix}/level7`} className="hover:text-gray-300">
            {t("HomePage.Header.level7")}
          </Link>
          <Link to={`${langPrefix}/posts`} className="hover:text-gray-300">
            {t("HomePage.Header.posts")}
          </Link>
          <Link to={`${langPrefix}/embroidery`} className="hover:text-gray-300">
            {t("HomePage.Header.embroidery")}
          </Link>
          <Link to={`${langPrefix}/employment`} className="hover:text-gray-300">
            {t("HomePage.Header.employment")}
          </Link>
          <Link to={`${langPrefix}/courses`} className="hover:text-gray-300">
            {t("HomePage.Header.courses")}
          </Link>
          <Link to={`${langPrefix}/products`} className="hover:text-gray-300">
            {t("HomePage.Header.products")}
          </Link>
        </nav>

        <div className="text-2xl font-bold">
          <Link to={`${langPrefix}/`}>My Website</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex justify-between items-center p-4">
        <button className="text-gray-600">Menu</button>
        <button
          onClick={handleLanguageChange}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {i18n.language === "en" ? "العربية" : "English"}
        </button>
      </div>
    </header>
  );
};

export default Header;
