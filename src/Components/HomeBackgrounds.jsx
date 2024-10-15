import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";

const HomeBackgrounds = () => {
  const [backgroundSources, setBackgroundSources] = useState([]);
  const [titleData, setTitleData] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, i18n } = useTranslation();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        const response = await axios.get(`${BASE_URL}slider`, {
          headers: {
            "Accept-Language": i18n.language,
          },
        });
        const data = await response?.data?.data?.data;
        const backgrounds = data.map((item) => ({
          type: item.media.endsWith(".mp4") ? "video" : "image",
          src: `${process.env.REACT_APP_MAIN_URL}/storage/${item.media}`,
        }));
        setTitleData(data);
        setBackgroundSources(backgrounds);
      } catch (error) {
        console.error("Error fetching background sources:", error);
      }
    };

    fetchBackgrounds();
  }, [BASE_URL, i18n.language]);

  // Change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prevSlide) => (prevSlide + 1) % backgroundSources.length
      );
    }, 5000); // 5000 ms = 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [backgroundSources.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {backgroundSources.length > 0 && (
        <div className="absolute inset-0 w-full h-full">
          {backgroundSources.map((bg, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {bg.type === "video" ? (
                <video
                  src={bg.src}
                  muted
                  loop
                  autoPlay={index === currentSlide}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={bg.src}
                  alt={`Background ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full text-main">
                <h1 className="text-7xl font-bold">{titleData[index]?.name}</h1>
                {titleData[index]?.link && (
                  <a
                    href={titleData[index]?.link}
                    className="mt-4 text-lg bg-main text-white px-5 py-3 flex gap-x-2 items-center mt-20 hover:bg-main_hover"
                    target="_blank"
                  >
                    <span className="font-semibold">
                      {t("common.goToWebsite")}
                    </span>
                    <IoArrowForward />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {backgroundSources.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-[#2481ce]" : "bg-gray-600"
            } transition-all duration-300`}
          />
        ))}
      </div>

      {/* Main content */}
    </div>
  );
};

export default HomeBackgrounds;
