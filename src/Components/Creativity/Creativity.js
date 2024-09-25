import React from "react";
import "./Creativity.css";
import { useTranslation } from "react-i18next";
import CreativityImage from "../../Images/creativity.png";
import { Link } from "react-router-dom";

const Creativity = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className={`creativity my-8 lg:px-16 md:px-16 px-5 py-8 ${
        i18n.language == "en" ? "text-left" : "text-right"
      }`}
      dir={i18n.language == "en" ? "ltr" : "rtl"}
    >
      <div className="lg:grid md:grid grid-cols-12 gap-6">
        <div className=" lg:col-span-6 md:col-span-6 col-span-12">
          <img
            src={CreativityImage}
            className=" mx-auto w-full my-4"
            alt="minister_image"
          />
        </div>
        <div className=" lg:col-span-6 md:col-span-6 col-span-12 px-6 my-auto">
          <p
            style={{
              color: "#44add2",
              fontWeight: "bold",
            }}
          >
            تعزيز الابتكار في الإجراءات والأساليب{" "}
          </p>
          <p className="my-2">-----------</p>
          <p className=" text-sm">
            تعزيز الابتكار في الإجراءات والأساليب لتطبيق افضل الممارسات الممكنة
            للعمليــات والخدمات لضمان تزامن هذه الأساليب مع النمو المتسارع في
            المنشأت والمرافق
          </p>
        </div>
        <button className="btn-creativity col-span-12 lg:block md:block flex justify-center">
          <Link to={"/about"}>سجل معنا</Link>
        </button>
      </div>
    </section>
  );
};

export default Creativity;
