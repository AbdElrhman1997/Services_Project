import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Create a context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [orderPhone, setOrderPhone] = useState(null);
  const [courseContentId, setCourseContentId] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}setting`,
          {
            headers: {
              "Accept-Language": i18n.language,
            },
          }
        );
        setOrderPhone(response?.data?.data?.whatsApp_number_for_purchase);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <AppContext.Provider
      value={{ orderPhone, courseContentId, setCourseContentId }}
    >
      {children}
    </AppContext.Provider>
  );
};
