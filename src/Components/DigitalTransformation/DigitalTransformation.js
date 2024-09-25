import React from "react";
import "./DigitalTransformation.css";
import { useTranslation } from "react-i18next";
import transformationImage from "../../Images/digital-transform.png";

const DigitalTransformation = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className={`digital-transformation mb-24 mt-28 lg:px-16 md:px-16 px-5 ${
        i18n.language == "en" ? "text-left" : "text-right"
      }`}
      dir={i18n.language == "en" ? "ltr" : "rtl"}
    >
      <div className="lg:grid md:grid grid-cols-12 gap-6 ">
        <div className=" lg:col-span-6 md:col-span-6 col-span-12">
          <img
            src={transformationImage}
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
            تعزيز التحول الرقمي
          </p>
          <p className="my-2">-----------</p>
          <p className=" text-sm">
            تعزيز أهمية التحول الرقمي في تحقيق التميز في إدارة المرافق ،
            واستكشاف أحدث الابتكارات في مجال التحول الرقمي ودورها في تعـزيز
            استراتيجيات إدارة المرافق .
          </p>
        </div>
      </div>
    </section>
  );
};

export default DigitalTransformation;
