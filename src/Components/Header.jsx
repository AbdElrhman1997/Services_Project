import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa"; // Import profile icon

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to manage mobile menu visibility
  const [authUser, setAuthUser] = useState(null); // State for authUser
  const path = location.pathname;

  const handleScroll = () => {
    const isHomePage = path === "/ar" || path === "/en";
    const header = document.getElementById("header");
    if (isHomePage) {
      if (window.scrollY > 80) {
        header?.classList.add("bg-white", "text-gray-600", "shadow-md");
        header?.classList.remove("bg-[#00000036]", "text-white");
      } else {
        header?.classList.add("bg-[#00000036]", "text-white");
        header?.classList.remove("bg-white", "shadow-md", "text-gray-600");
      }
    } else {
      header?.classList.add("bg-white", "text-gray-600", "shadow-md");
      header?.classList.remove("bg-[#00000036]", "text-white");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check for authUser in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
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
      className="fixed w-full top-0 left-0 z-50 transition-all duration-300 bg-[#00000036] text-white font-semibold shadow-lg min-h-[64px]"
      dir={i18n.language === "en" ? "ltr" : "rtl"}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Navigation Links and Logo */}
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="items-center mx-2 hidden lg:flex">
            {/* Conditionally render the login button or profile icon */}
            {authUser ? (
              <Link
                to={`${langPrefix}/profile`} // Link to profile page
                className="flex items-center  transition-all duration-300"
              >
                <div className="flex flex-col items-center text-[#2481ce]">
                  <FaUserCircle
                    size={28}
                    className="mr-2 text-[#2481ce] hover:text-gray-400"
                  />
                </div>
              </Link>
            ) : (
              <button className="empty-button">
                <Link
                  to={`${langPrefix}/login`}
                  className="hover:text-gray-300 transition-all duration-300"
                >
                  {t("HomePage.Header.login")}
                </Link>
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-[#2481ce] text-2xl"
            >
              {isMobileMenuOpen ? (
                <FaTimes /> // Close icon when the menu is open
              ) : (
                <FaBars /> // Menu icon when the menu is closed
              )}
            </button>
          </div>

          {/* Navigation Links (Visible on large screens) */}
          <nav
            className={`hidden lg:flex gap-x-8 justify-center items-center ${
              i18n.language === "en" ? "text-[12px]" : ""
            }`}
          >
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
            <Link to={`${langPrefix}/level7`} className="hover:text-[#2481ce]">
              {t("HomePage.Header.level7")}
            </Link>
            <Link to={`${langPrefix}/posts`} className="hover:text-[#2481ce]">
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
            <Link to={`${langPrefix}/courses`} className="hover:text-[#2481ce]">
              {t("HomePage.Header.courses")}
            </Link>
            {/* <Link
              to={`${langPrefix}/products`}
              className="hover:text-[#2481ce]"
            >
              {t("HomePage.Header.products")}
            </Link> */}
            <Link
              to={`${langPrefix}/batrouns`}
              className="hover:text-[#2481ce]"
            >
              {t("HomePage.Header.batrouns")}
            </Link>
            {/* Other links */}
          </nav>

          {/* Website Logo */}
          <div className="text-2xl font-bold">
            <Link to={`${langPrefix}/`}>My Website</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Display on mobile and toggle visibility) */}
      <div
        className={`fixed top-[64px] right-0 h-full w-full bg-white transform transition-all duration-500 ease-in-out z-50 lg:hidden ${
          isMobileMenuOpen ? "clip-path-open" : "clip-path-closed"
        }`}
      >
        <nav className="flex flex-col md:gap-y-4 gap-y-10 pt-4 items-center">
          <Link
            to={`${langPrefix}/`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.home")}
          </Link>
          <Link
            to={`${langPrefix}/services`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.ourServices")}
          </Link>
          <Link
            to={`${langPrefix}/consultations`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.consultations")}
          </Link>
          <Link
            to={`${langPrefix}/level7`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.level7")}
          </Link>
          <Link
            to={`${langPrefix}/posts`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.posts")}
          </Link>
          <Link
            to={`${langPrefix}/embroidery`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.embroidery")}
          </Link>
          <Link
            to={`${langPrefix}/employment`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.employment")}
          </Link>
          <Link
            to={`${langPrefix}/courses`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.courses")}
          </Link>
          {/* <Link
            to={`${langPrefix}/products`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.products")}
          </Link> */}
          <Link
            to={`${langPrefix}/batrouns`}
            className="hover:text-[#2481ce]"
            onClick={() => {
              setIsMobileMenuOpen(false);
            }}
          >
            {t("HomePage.Header.batrouns")}
          </Link>

          {/* Conditionally render the login button or profile icon */}
          {authUser ? (
            <Link
              to={`${langPrefix}/profile`} // Link to profile page
              className="flex items-center text-[#2481ce] hover:text-gray-300 transition-all duration-300"
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
            >
              <FaUserCircle size={28} className="mr-2" />
              {/* {authUser.name} Display user name */}
            </Link>
          ) : (
            <button className="empty-button">
              <Link
                to={`${langPrefix}/login`}
                className="hover:text-[#2481ce] transition-all duration-300"
              >
                {t("HomePage.Header.login")}
              </Link>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
