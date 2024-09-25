import React from "react";
import "./WhyThisEvent.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const WhyThisEvent = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="" dir={i18n.language == "en" ? "ltr" : "rtl"}>
      <p
        style={{
          fontWeight: "bold",
          color: "#44add2",
        }}
        className={`mb-10 mx-16 text-3xl ${
          i18n.language == "en"
            ? "lg:text-left md:text-left text-center"
            : "lg:text-right md:text-right text-center"
        }`}
      >
        الجهات الحكومية
      </p>
      <div
        className={`why-this-event lg:px-16 md:px-16 px-5 mb-24 ${
          i18n.language == "en" ? "text-left" : "text-right"
        }`}
      >
        <div className="lg:grid md:grid grid-cols-12 gap-6 mx-auto w-fit">
          <div className=" lg:col-span-6 md:col-span-6 col-span-12 lg:px-16 md:px-16 px-5 my-auto text-white">
            <p
              style={{
                fontWeight: "bold",
              }}
              className="text-2xl"
            >
              لماذا ترعى هذا الحدث ؟
            </p>
            <p className=" text-sm my-3">
              إن اختياركم إحدى فئات رعاية المؤتمر والمعرض الدولي لإدارة المرافق
              سيمنحكم العديد من المميزات وفق كل فئة
            </p>
          </div>
          <div className=" lg:col-span-6 md:col-span-6 col-span-12 lg:block md:block flex justify-center">
            <button className="btn-why-this-event">
              <Link to={"/about"}>اعرض معنا</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyThisEvent;
