import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const HomeBackgrounds = () => {
  const [backgroundSources, setBackgroundSources] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { i18n } = useTranslation();
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
          src: `http://195.35.37.105:200/storage/${item.media}`,
        }));

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
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="mt-4 text-lg">
          Here is some main content on top of the video or image background.
        </p>
      </div>
    </div>
  );
};

export default HomeBackgrounds;
