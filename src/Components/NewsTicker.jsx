import Marquee from "react-fast-marquee";
import React, { useEffect, useState } from "react";
import Image1 from "../public/Images/Artboard 1.png";
import Image2 from "../public/Images/Artboard 2.png";
import Image3 from "../public/Images/Artboard 3.png";
import Image4 from "../public/Images/Artboard 4.png";
import Image5 from "../public/Images/Artboard 5.png";
import Image6 from "../public/Images/Artboard 6.png";
import Image7 from "../public/Images/Artboard 7.png";
import Image8 from "../public/Images/Artboard 8.png";
import Image9 from "../public/Images/Artboard 9.png";
import Image10 from "../public/Images/Artboard 10.png";
import Image11 from "../public/Images/Artboard 11.png";
import Image12 from "../public/Images/Artboard 12.png";
import Image13 from "../public/Images/Artboard 13.png";
import { useTranslation } from "react-i18next";
import axios from "axios";

const NewsTicker = () => {
  const { t, i18n } = useTranslation();
  const [partners, setPartners] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}partners`, {
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      const data = response?.data?.data;
      setPartners(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [i18n.language]);

  return (
    <div className="mb-10 xl:py-8 lg:py-8 md:py-8 py-2">
      <p className="text-main xl:text-4xl lg:text-4xl md:text-4xl text-3xl text-center font-bold mt-4 mb-10 leading-relaxed px-3">
        {t("common.NewsTickerTitle")}
      </p>
      <Marquee direction="left" loop={0} autoFill={true} speed={200}>
        {partners?.map((partner, index) => (
          <img
            key={index}
            src={`${process.env.REACT_APP_MAIN_URL}/storage/${partner?.image}`}
            alt={`Artboard ${index + 1}`}
            className="xl:h-20 lg:h-20 md:h-20 h-14 mx-6 my-4"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default NewsTicker;
