import React from "react";
import "./RegisterWithUs.css";
import { useTranslation } from "react-i18next";
import RegisterWithUsImage from "../../Images/RegisterWithUs.png";
import { Link } from "react-router-dom";

const RegisterWithUs = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className={`register-with-us my-8 lg:px-16 md:px-16 px-5 py-16 ${
        i18n.language == "en" ? "text-left" : "text-right"
      }`}
      dir={i18n.language == "en" ? "ltr" : "rtl"}
    >
      <div className="lg:grid md:grid grid-cols-12">
        <div className=" lg:col-span-6 md:col-span-6 col-span-12 my-auto mb-12">
          <p
            style={{
              color: "#44add2",
              fontWeight: "bold",
            }}
            className="text-2xl"
          >
            لا تفوت الفرصة وكن جزء من الحدث
          </p>
          <p className="mt-2 mb-8  text-3xl lg:w-96 lg:leading-relaxed md:leading-relaxed leading-10">
            عزز من تواجدك وترسيخ علامتك التجارية
          </p>
          <div className="flex justify-start">
            <button className="btn-register col-span-12 lg:block md:block flex justify-center p-0">
              <Link to={"/about"}>سجل معنا</Link>
            </button>
            <button className="btn-view h-fit my-auto p-0">
              <Link to={"/about"}>اعرض معنا</Link>
            </button>
          </div>
        </div>
        <div className=" lg:col-span-6 md:col-span-6 col-span-12 mx-2">
          <img
            src={RegisterWithUsImage}
            className=" mx-auto w-full my-4"
            alt="minister_image"
          />
        </div>
      </div>
    </section>
  );
};

export default RegisterWithUs;
