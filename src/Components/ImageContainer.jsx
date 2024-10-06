import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

const ImageContainer = ({ media }) => {
  const [selectedVideo, setSelectedVideo] = useState();

  const isVideo = (media) => {
    console.log(media?.image);
    const videoFormats = [".mp4", ".webm", ".ogg"];
    return videoFormats.some((format) => media?.image?.endsWith(format));
  };

  const openModal = (video) => {
    setSelectedVideo(video);
  };

  // Close modal function
  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className={`grid grid-cols-12 gap-2 col-span-12 mt-4`}>
      {media.length == 1 ? (
        <div className="col-span-12 overflow-hidden">
          {isVideo(media[0]) ? (
            <div className="relative" onClick={() => openModal(media[0])}>
              {console.log(media[0])}
              <video
                className="w-full h-60  "
                src={`http://dashboard.level7ksa.com/${media[0]?.image}`}
              />
              {/* Play Icon Overlay */}
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <FaPlay className="text-white text-4xl" />
              </div>
            </div>
          ) : (
            <img
              src={`http://dashboard.level7ksa.com/${media[0]?.image}`}
              className="w-full h-60 object-cover"
              alt="Property"
            />
          )}
        </div>
      ) : media.length == 2 ? (
        <>
          {isVideo(media[0]) ? (
            <div
              className="relative col-span-6"
              onClick={() => openModal(media[0])}
            >
              <video
                className="col-span-1 w-full h-60 "
                src={`http://dashboard.level7ksa.com/${media[0]?.image}`}
              />
              {/* Play Icon Overlay */}
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <FaPlay className="text-white text-4xl" />
              </div>
              {console.log(media[0]?.image)}
            </div>
          ) : (
            <img
              src={`http://dashboard.level7ksa.com/${media[0]?.image}`}
              className="col-span-6 w-full h-60 object-cover"
              alt="Property"
            />
          )}
          {isVideo(media[1]) ? (
            <div
              className="relative col-span-6"
              onClick={() => openModal(media[1])}
            >
              <video
                className="col-span-1 w-full h-60 "
                src={`http://dashboard.level7ksa.com/${media[1]?.image}`}
              />
              {/* Play Icon Overlay */}
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <FaPlay className="text-white text-4xl" />
              </div>
            </div>
          ) : (
            <img
              src={`http://dashboard.level7ksa.com/${media[1]?.image}`}
              className="col-span-6 w-full h-60 object-cover"
              alt="Property"
            />
          )}
        </>
      ) : media.length == 3 ? (
        <div className="col-span-12 grid grid-cols-12 gap-2">
          <div className="col-span-6">
            {isVideo(media[0]?.image) ? (
              <div
                className="relative col-span-6"
                onClick={() => openModal(media[0])}
              >
                <video
                  className="col-span-1 w-full h-60 "
                  src={`http://dashboard.level7ksa.com/${media[0]?.image}`}
                />
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
            ) : (
              <img
                src={`http://dashboard.level7ksa.com/${media[0]?.image}`}
                className="col-span-6 w-full h-60 object-cover"
                alt="Property"
              />
            )}
            {isVideo(media[1]?.image) ? (
              <div
                className="relative col-span-6"
                onClick={() => openModal(media[1]?.image)}
              >
                <video
                  className="col-span-1 w-full h-60 "
                  src={`http://dashboard.level7ksa.com/${media[1]?.image}`}
                />
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
            ) : (
              <img
                src={`http://dashboard.level7ksa.com/${media[1]?.image}`}
                className="col-span-6 w-full h-60 object-cover"
                alt="Property"
              />
            )}
          </div>
          <div className="col-span-6 flex justify-center items-center">
            {isVideo(media[2]) ? (
              <div
                className="relative col-span-6"
                onClick={() => openModal(media[2]?.image)}
              >
                <video
                  className="col-span-1 w-full h-60 "
                  src={`http://dashboard.level7ksa.com/${media[2]?.image}`}
                />
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
            ) : (
              <img
                src={`http://dashboard.level7ksa.com/${media[2]?.image}`}
                className="col-span-6 w-full h-60 object-cover"
                alt="Property"
              />
            )}
          </div>
        </div>
      ) : media.length == 4 ? (
        <div className="col-span-12 grid grid-cols-12 gap-2">
          <div className="col-span-6">
            {isVideo(media[0]?.image) ? (
              <div
                className="relative col-span-6"
                onClick={() => openModal(media[0])}
              >
                <video
                  className="col-span-1 w-full h-60 "
                  src={`http://dashboard.level7ksa.com/${media[0]?.image}`}
                />
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
            ) : (
              <img
                src={`http://dashboard.level7ksa.com/${media[0]?.image}`}
                className="col-span-6 w-full h-60 object-cover"
                alt="Property"
              />
            )}
            {isVideo(media[1]?.image) ? (
              <div
                className="relative col-span-6"
                onClick={() => openModal(media[1]?.image)}
              >
                <video
                  className="col-span-1 w-full h-60 "
                  src={`http://dashboard.level7ksa.com/${media[1]?.image}`}
                />
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
            ) : (
              <img
                src={`http://dashboard.level7ksa.com/${media[1]?.image}`}
                className="col-span-6 w-full h-60 object-cover"
                alt="Property"
              />
            )}
          </div>
          <div className="col-span-6">
            {isVideo(media[2]?.image) ? (
              <div
                className="relative col-span-6"
                onClick={() => openModal(media[2])}
              >
                <video
                  className="col-span-1 w-full h-60 "
                  src={`http://dashboard.level7ksa.com/${media[2]?.image}`}
                />
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
            ) : (
              <img
                src={`http://dashboard.level7ksa.com/${media[2]?.image}`}
                className="col-span-6 w-full h-60 object-cover"
                alt="Property"
              />
            )}
            {isVideo(media[3]?.image) ? (
              <div
                className="relative col-span-6"
                onClick={() => openModal(media[3]?.image)}
              >
                <video
                  className="col-span-1 w-full h-60 "
                  src={`http://dashboard.level7ksa.com/${media[3]?.image}`}
                />
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                  <FaPlay className="text-white text-4xl" />
                </div>
              </div>
            ) : (
              <img
                src={`http://dashboard.level7ksa.com/${media[3]?.image}`}
                className="col-span-6 w-full h-60 object-cover"
                alt="Property"
              />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {selectedVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 px-4"
          onClick={closeModal} // Close modal when clicking outside the video
        >
          <div
            className="bg-white p-4 rounded-md"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the video
          >
            <video
              width="600"
              controls
              src={`http://dashboard.level7ksa.com/${selectedVideo?.image}`} // Replace with your actual video path
              className="rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;
