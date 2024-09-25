import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import logoImg from "../../Images/logo-dark.png";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

const Navbar = () => {
  const [displayNav, setDisplayNav] = useState(false);
  const { t, i18n } = useTranslation();
  const changeLanguageAction = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("I18N_LANGUAGE", lang);
  };

  return (
    <header
      className="fixed top-0 w-full nav lg:px-16 md:px-16 px-2"
      data-aos="fade-bottom"
      data-aos-delay="500"
      dir={i18n.language == "en" ? "ltr" : "rtl"}
    >
      <div className=" mx-auto flex justify-between items-center gap-6">
        {/*lg screens nav*/}
        <img
          src={logoImg}
          className="logo lg:col-span-3 md:col-span-3 col-span-6 lg:w-72 md:w-72 sm:w-64 w-48"
          alt="logo"
        />
        <div className="flex justify-between items-center gap-8">
          <ul className="flex justify-between gap-4 lg:flex hidden text-bs font-semibold">
            <li>
              <a href="/">{t("common.main")}</a>
            </li>
            <li>
              <a href="/About">{t("common.aboutUS")}</a>
            </li>
            <li>
              <a href="/Services">{t("common.conference")}</a>
            </li>
            <li>
              <a href="/Blog">{t("common.sponsors")}</a>
            </li>
            <li>
              <a href="/Pricing">{t("common.login")}</a>
            </li>
            <li>
              <a href="/Contact">{t("common.events")}</a>
            </li>
          </ul>
          <div className=" col-span-3 flex gap-6 items-center lg:flex hidden">
            {i18n.language == "en" ? (
              <div
                className=" rounded-md p-2 w-24 btn lg:block md:block hidden"
                style={{ backgroundColor: "#44ADD2" }}
                onClick={() => changeLanguageAction("ar")}
              >
                <p className=" text-white font-bold">العربية</p>
              </div>
            ) : (
              <div
                className="rounded-md p-2 w-24 btn lg:block md:block hidden"
                style={{ backgroundColor: "#44ADD2" }}
                onClick={() => changeLanguageAction("en")}
              >
                <p className=" text-white font-bold">English</p>
              </div>
            )}
          </div>
        </div>

        {/*mobile screens nav*/}

        <div
          className="text-black p-3 rounded-md lg:hidden block cursor-pointer"
          onClick={() => {
            displayNav ? setDisplayNav(false) : setDisplayNav(true);
          }}
        >
          <FaBars className="sm:text-2xl text-xl  text-black" />
        </div>
        <ul
          className={`text-black col-span-12 justify-around nav-list lg:hidden md:hidden flex flex-col ${
            displayNav ? "flex" : "hidden"
          }`}
        >
          <li>
            <a href="/">{t("common.main")}</a>
          </li>
          <li>
            <a href="/About">{t("common.aboutUS")}</a>
          </li>
          <li>
            <a href="/Services">{t("common.conference")}</a>
          </li>
          <li>
            <a href="/Blog">{t("common.sponsors")}</a>
          </li>
          <li>
            <a href="/Pricing">{t("common.login")}</a>
          </li>
          <li>
            <a href="/Contact">{t("common.events")}</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
