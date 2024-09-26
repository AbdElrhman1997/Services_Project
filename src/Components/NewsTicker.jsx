import Marquee from "react-fast-marquee";
import React from "react";
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

const NewsTicker = () => {
  const images = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image5,
    Image6,
    Image7,
    Image8,
    Image9,
    Image10,
    Image11,
    Image12,
    Image13,
  ];

  return (
    <div className="mb-20">
      <p className="text-black text-4xl text-center font-semibold mb-12 mt-12">
        نخدم نخبة من الشركات الرائدة
      </p>
      <Marquee direction="left" loop={0} autoFill={true} speed={200}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Artboard ${index + 1}`}
            className="h-20 mx-6"
            style={{ width: "auto", height: "80px" }} // Use CSS for height
          />
        ))}
      </Marquee>
    </div>
  );
};

export default NewsTicker;
