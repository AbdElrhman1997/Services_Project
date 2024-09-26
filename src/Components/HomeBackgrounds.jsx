import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import React, { useEffect, useState, useRef } from "react";

const HomeBackgrounds = () => {
  const [backgroundSources, setBackgroundSources] = useState([]);
  const swiperRef = useRef(null); // Reference to the Swiper instance

  // Fetching data from the API
  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        const response = await fetch("http://195.35.37.105:200/api/slider");
        const data = await response.json();

        // Extract the media paths from the response data
        const backgrounds = data.data.data.map((item) => ({
          type: item.media.endsWith(".mp4") ? "video" : "image", // Determine type based on media extension
          src: `http://195.35.37.105:200/storage/${item.media}`, // Construct the full URL for media
        }));

        setBackgroundSources(backgrounds);
      } catch (error) {
        console.error("Error fetching background sources:", error);
      }
    };

    fetchBackgrounds();
  }, []);

  // Function to handle drag start
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index); // Store the index of the dragged item
  };

  // Function to handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const targetIndex = e.currentTarget.dataset.index;

    if (draggedIndex !== targetIndex) {
      const newBackgroundSources = [...backgroundSources];
      const [removed] = newBackgroundSources.splice(draggedIndex, 1); // Remove the dragged item
      newBackgroundSources.splice(targetIndex, 0, removed); // Insert it into the new position
      setBackgroundSources(newBackgroundSources);
    }
  };

  // Function to handle drag over
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 5000, // Delay between transitions
          disableOnInteraction: false, // Keep autoplay running after user interactions
        }}
        loop={true}
        pagination={{ clickable: true }}
        className="h-full w-full"
        style={{ height: "100vh" }}
      >
        {backgroundSources.map((bg, index) => (
          <SwiperSlide
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-index={index} // Set the index as data attribute for drop target
          >
            {bg.type === "video" ? (
              <video
                src={bg.src}
                autoPlay
                // muted
                loop
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={bg.src}
                alt={`Background ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy" // Use lazy loading for images
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

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
