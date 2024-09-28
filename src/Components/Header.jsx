import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

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

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Determine the language prefix
  const langPrefix = i18n.language === "en" ? "/en" : "/ar";

  return (
    <header
      id="header"
      className="fixed w-full top-0 left-0 z-50 transition-all duration-300 bg-[#00000036] text-white font-semibold"
      dir={i18n.language === "en" ? "ltr" : "rtl"}
    >
      <div className="container mx-auto flex justify-between items-center px-4 ">
        {/* Website Logo */}
        {/* <div className="text-2xl font-bold">
          <Link to={`${langPrefix}/`}>My Website</Link>
        </div> */}

        {/* Navigation Links (Visible on large screens) */}
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className=" items-center mx-2 hidden lg:flex">
            <button className="empty-button">
              <Link
                to={`${langPrefix}/login`}
                className="hover:text-gray-300 transition-all duration-300"
              >
                {t("HomePage.Header.login")}
              </Link>
            </button>
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-[#2481ce] text-2xl"
            >
              ☰
            </button>
          </div>
          <nav
            className={`hidden lg:flex gap-x-8 justify-center items-center ${
              i18n.language === "en" ? "text-[12px]" : ""
            }`}
          >
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
            <Link
              to={`${langPrefix}/embroidery`}
              className="hover:text-gray-300"
            >
              {t("HomePage.Header.embroidery")}
            </Link>
            <Link
              to={`${langPrefix}/employment`}
              className="hover:text-gray-300"
            >
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
      </div>

      {/* Mobile Menu (Display on mobile and toggle visibility) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col items-center p-4  min-h-screen bg-gray-50">
          <nav className="flex flex-col md:gap-y-4 gap-y-8 pt-4">
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
            <Link
              to={`${langPrefix}/embroidery`}
              className="hover:text-gray-300"
            >
              {t("HomePage.Header.embroidery")}
            </Link>
            <Link
              to={`${langPrefix}/employment`}
              className="hover:text-gray-300"
            >
              {t("HomePage.Header.employment")}
            </Link>
            <Link to={`${langPrefix}/courses`} className="hover:text-gray-300">
              {t("HomePage.Header.courses")}
            </Link>
            <Link to={`${langPrefix}/products`} className="hover:text-gray-300">
              {t("HomePage.Header.products")}
            </Link>
            <button className="empty-button">
              <Link
                to={`${langPrefix}/login`}
                className="hover:text-gray-300 transition-all duration-300"
              >
                {t("HomePage.Header.login")}
              </Link>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
