import React from "react";
import { FaBriefcase, FaTrophy, FaLightbulb, FaHeart } from "react-icons/fa";
import "./CoOperation.css";
import { useTranslation } from "react-i18next";
import CoOperationImage from "../../Images/co-op.png";

const CoOperation = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className={`co-op my-8 lg:px-16 md:px-16 px-5 py-16 ${
        i18n.language == "en" ? "text-left" : "text-right"
      }`}
      dir={i18n.language == "en" ? "ltr" : "rtl"}
    >
      <div className="lg:grid md:grid grid-cols-12 gap-6 ">
        <div className=" lg:col-span-6 md:col-span-6 col-span-12 px-6 my-auto">
          <p
            style={{
              color: "#44add2",
              fontWeight: "bold",
            }}
          >
            الاستفادة من التجارب وتبادل الخبرات{" "}
          </p>
          <p className="my-2">-----------</p>
          <p className=" text-sm">
            تسليط الضوء على أبرز الممارسات الحديثه في القطاعات المختلفة ، و
            تبادل الخبرات ومشاركة الأفكار والمعرفة .
          </p>
        </div>
        <div className=" lg:col-span-6 md:col-span-6 col-span-12">
          <img
            src={CoOperationImage}
            className=" mx-auto w-full my-4"
            alt="minister_image"
          />
        </div>
      </div>
    </section>
  );
};

export default CoOperation;
