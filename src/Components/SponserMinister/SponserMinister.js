import React from "react";
import "./SponserMinister.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ministerImage from "../../Images/minister.png";

const SponserMinister = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className="sponser-minister"
      dir={i18n.language == "en" ? "ltr" : "rtl"}
    >
      <div className="lg:grid md:grid grid-cols-12 gap-6 ">
        <div className=" lg:col-span-6 md:col-span-6 col-span-12 lg:p-16 md:p-12 p-6">
          <img
            src={ministerImage}
            className=" mx-auto w-full"
            alt="minister_image"
          />
        </div>
        <div className=" lg:col-span-6 md:col-span-6 col-span-12 lg:p-16 md:p-12 px-6 w-full h-full flex flex-col justify-center items-center">
          <p
            style={{
              color: "#44add2",
              fontWeight: "bold",
            }}
          >
            برعاية
          </p>
          <p
            style={{
              color: "#103783",
              margin: "4px 0 24px 0",
              fontWeight: "bold",
            }}
          >
            معالي وزير البلديات والإسكان
          </p>
          <p
            style={{
              color: "rgb(53, 152, 219)",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            أ. ماجد بن عبدالله الحقيل
          </p>
          <p style={{ margin: " 24px 0" }}>
            ينطلق المؤتمر والمعرض الدولي لإدارة المرافق في سبتمبر 2024
          </p>
        </div>
      </div>
    </section>
  );
};

export default SponserMinister;
