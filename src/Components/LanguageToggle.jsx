import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom"; // Import useLocation
import EnFlag from "../public/Images/united-kingdom.png";
import ArFlag from "../public/Images/flag.png";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const location = useLocation(); // Get the current location

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    i18n.changeLanguage(newLocale);

    // Update the URL to reflect the language change while keeping the same route
    const newPath = location.pathname.replace(
      `/${currentLocale}`,
      `/${newLocale}`
    );
    window.history.pushState(null, "", newPath); // Update the URL without reloading the page
  };

  return (
    <button
      className="bg-white fixed bottom-0 right-40 shadow-lg px-[6px]"
      style={{ borderRadius: "8px 8px 0 0", zIndex: "100" }}
      onClick={toggleLanguage}
    >
      <div className="flex items-center justify-center">
        {currentLocale === "ar" ? (
          <img
            src={EnFlag}
            alt="English Flag"
            width={35}
            height={35}
            className="m-[6px]"
          />
        ) : (
          <img src={ArFlag} alt="Arabic Flag" width={48} height={48} />
        )}
      </div>
    </button>
  );
};

export default LanguageToggle;
