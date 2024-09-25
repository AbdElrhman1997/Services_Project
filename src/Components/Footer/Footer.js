import React from "react";
import "./Footer.css";
import image1 from "../../Images/sary.png";
import image2 from "../../Images/sfma.png";
import image3 from "../../Images/mom.png";
import image4 from "../../Images/Strategic-Sponsor.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer
      className="bg-slate-800 py-5 pt-10 footer"
      dir={i18n.language == "en" ? "ltr" : "rtl"}
    >
      <div className="lg:grid md:grid grid-cols-12 gap-6 ">
        <div className=" lg:col-span-3 md:col-span-6 lg:my-6 md:my-6 my-16">
          <img src={image1} className=" w-32 mx-auto" alt="footerImage" />
          <p className=" text-white text-center font-semibold my-6 px-3">
            شركة ساري للمعارض والمؤتمرات تعد شركة رائدة تقدم إدارة الفعاليات
            والمعـــــــارض والتسويق بمعايير جودة عالية وذلك من خلال فريق عمل
            متخصص ومستعد دائماً لتقديم كل ما هو جديد ومبتكر. خبرة عريضة مع
            القطــــــاعات الحكـــــــومية والخاصة ودعم متكامل للخدمات الفرعية.
            شريككم المفضل دائما.
          </p>
        </div>
        <div className=" lg:col-span-3 md:col-span-6 text-white lg:my-6 md:my-6 my-16">
          <p className="text-3xl font-bold ">الروابط</p>
          <Link to={"/"} className="block mx-3 my-5 text-xl">
            {t("common.main")}
          </Link>
          <Link to={"/"} className="block mx-3 my-5 text-xl">
            {t("common.aboutUS")}
          </Link>
          <Link to={"/"} className="block mx-3 my-5 text-xl">
            {t("common.conference")}
          </Link>
          <Link to={"/"} className="block mx-3 my-5 text-xl">
            {t("common.sponsors")}
          </Link>
          <Link to={"/"} className="block mx-3 my-5 text-xl">
            {t("common.login")}
          </Link>
          <Link to={"/"} className="block mx-3 my-5 text-xl">
            {t("common.events")}
          </Link>
        </div>
        <div className=" lg:col-span-3 md:col-span-6 text-white lg:my-6 md:my-6 my-16">
          <p className="text-3xl font-bold ">تواصل معنا</p>
          <Link to={"/"} className="block mx-3 my-5 text-xl">
            {t("common.main")}
          </Link>

          <Link to={"/"} className="block mx-3 my-2 text-xl">
            966503776726+
          </Link>
          <Link to={"/"} className="block mx-3 my-2 text-xl">
            966554222273+
          </Link>
          <Link to={"/"} className="block mx-3 my-4 text-xl">
            الرياض - فندق الفيرمونت
          </Link>
        </div>
        <div className=" lg:col-span-3 md:col-span-6 lg:my-6 md:my-6 my-16">
          <img src={image2} className="footerImg mx-auto" alt="footerImage" />
          <img
            src={image3}
            className="footerImg mx-auto my-5"
            alt="footerImage"
          />
          <img src={image4} className="footerImg mx-auto" alt="footerImage" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// data-aos='fade-top' data-aos-delay='200'
