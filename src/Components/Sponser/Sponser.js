import React from "react";
import "./Sponser.css";
import { useTranslation } from "react-i18next";
import StrategicSponsor from "../../Images/Strategic-Sponsor-1.png";
import MainSponsor from "../../Images/Main-Sponsor.png";
import DiamondSponsor1 from "../../Images/Diamond-Sponsor-1.png";
import DiamondSponsor2 from "../../Images/Diamond-Sponsor-2.png";
import DiamondSponsor3 from "../../Images/Diamond-Sponsor-3.png";
import DiamondSponsor4 from "../../Images/Diamond-Sponsor-4.png";
import DiamondSponsor5 from "../../Images/Diamond-Sponsor-5.png";
import DiamondSponsor6 from "../../Images/Diamond-Sponsor-6.png";
import GoldenSponsor1 from "../../Images/Golden-Sponser1.png";
import GoldenSponsor2 from "../../Images/Golden-Sponser2.png";
import GoldenSponsor3 from "../../Images/Golden-Sponser3.png";
import GoldenSponsor4 from "../../Images/Golden-Sponser4.png";
import GoldenSponsor5 from "../../Images/Golden-Sponser5.png";
import GoldenSponsor6 from "../../Images/Golden-Sponser6.png";
import SupportingPartners1 from "../../Images/Supporting-Partners1.png";
import SupportingPartners2 from "../../Images/Supporting-Partners2.png";
import SupportingPartners3 from "../../Images/Supporting-Partners3.png";
import Carousel from "../../Components/Carousel/Carousel";
const Sponser = () => {
  const { t, i18n } = useTranslation();
  const GoldenSponsers = [
    { imgSrc: GoldenSponsor1, name: "DiamondSponsor1", count: 53 },
    { imgSrc: GoldenSponsor2, name: "DiamondSponsor1", count: 58 },
    { imgSrc: GoldenSponsor3, name: "DiamondSponsor1", count: 68 },
    { imgSrc: GoldenSponsor4, name: "DiamondSponsor1", count: 74 },
    { imgSrc: GoldenSponsor5, name: "DiamondSponsor1", count: 20 },
    { imgSrc: GoldenSponsor6, name: "DiamondSponsor1", count: 29 },
  ];
  const SupportingPartners = [
    { imgSrc: SupportingPartners1, name: "DiamondSponsor1", count: 22 },
    { imgSrc: SupportingPartners2, name: "DiamondSponsor1", count: 44 },
    { imgSrc: SupportingPartners3, name: "DiamondSponsor1", count: 55 },
    { imgSrc: SupportingPartners1, name: "DiamondSponsor1", count: 66 },
    { imgSrc: SupportingPartners2, name: "DiamondSponsor1", count: 77 },
    { imgSrc: SupportingPartners3, name: "DiamondSponsor1", count: 88 },
  ];

  return (
    <section className="" dir={i18n.language == "en" ? "ltr" : "rtl"}>
      <p
        style={{
          fontWeight: "bold",
          color: "#44add2",
        }}
        className={` mx-16 text-3xl ${
          i18n.language == "en"
            ? "lg:text-left md:text-left text-center"
            : "lg:text-right md:text-right text-center"
        }`}
      >
        الراعي الاستراتيجي
      </p>
      <div>
        <img
          src={StrategicSponsor}
          className=" mx-auto lg:w-96 md:w-80 w-72"
          alt="minister_image"
        />
      </div>
      <p
        style={{
          fontWeight: "bold",
          color: "#44add2",
        }}
        className={` mx-16 text-3xl ${
          i18n.language == "en"
            ? "lg:text-left md:text-left text-center"
            : "lg:text-right md:text-right text-center"
        }`}
      >
        الراعي الرئيسي
      </p>
      <div>
        <img
          src={MainSponsor}
          className=" mx-auto lg:w-56 md:w-48 w-40 my-8"
          alt="minister_image"
        />
      </div>
      <p
        style={{
          fontWeight: "bold",
          color: "#44add2",
        }}
        className={` mx-16 text-3xl ${
          i18n.language == "en"
            ? "lg:text-left md:text-left text-center"
            : "lg:text-right md:text-right text-center"
        }`}
      >
        الراعي الماسي
      </p>
      <div className=" grid grid-cols-12 py-8 lg:gap-8 md:gap-8 sm:gap-8">
        <img
          src={DiamondSponsor1}
          className=" mx-auto lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 lg:w-52 md:w-48 w-40"
          alt="minister_image"
        />
        <img
          src={DiamondSponsor2}
          className=" mx-auto lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 lg:w-52 md:w-48 w-40 lg:my-0 md:my-0 sm:my-0 my-8"
          alt="minister_image"
        />
        <img
          src={DiamondSponsor3}
          className=" mx-auto lg:col-span-4 md:col-span-12 sm:col-span-12 col-span-12 lg:w-52 md:w-48 w-40"
          alt="minister_image"
        />
      </div>
      <div className=" grid grid-cols-12 lg:gap-8 md:gap-8 sm:gap-8">
        <img
          src={DiamondSponsor4}
          className=" mx-auto lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 lg:w-52 md:w-48 w-40"
          alt="minister_image"
        />
        <img
          src={DiamondSponsor5}
          className=" mx-auto lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 lg:w-52 md:w-48 w-40 lg:my-0 md:my-0 sm:my-0 my-8"
          alt="minister_image"
        />
        <img
          src={DiamondSponsor6}
          className=" mx-auto lg:col-span-4 md:col-span-12 sm:col-span-12 col-span-12 lg:w-52 md:w-48 w-40 mb-12"
          alt="minister_image"
        />
      </div>
      <div className=" grid grid-cols-12 lg:gap-8 md:gap-8 sm:gap-8">
        <img
          src={DiamondSponsor1}
          className=" mx-auto lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 lg:w-52 md:w-48 w-40"
          alt="minister_image"
        />
        <img
          src={DiamondSponsor2}
          className=" mx-auto lg:col-span-4 md:col-span-6 sm:col-span-6 col-span-12 lg:w-52 md:w-48 w-40 lg:my-0 md:my-0 sm:my-0 my-8"
          alt="minister_image"
        />
        <img
          src={DiamondSponsor3}
          className=" mx-auto lg:col-span-4 md:col-span-12 sm:col-span-12 col-span-12 lg:w-52 md:w-48 w-40 mb-12"
          alt="minister_image"
        />
      </div>

      <p
        style={{
          fontWeight: "bold",
          color: "#44add2",
        }}
        className={` mx-16 text-3xl ${
          i18n.language == "en"
            ? "lg:text-left md:text-left text-center"
            : "lg:text-right md:text-right text-center"
        }`}
      >
        الراعي الذهبي
      </p>
      <Carousel sponsers={GoldenSponsers} />
      <p
        style={{
          fontWeight: "bold",
          color: "#44add2",
        }}
        className={` mx-16 text-3xl ${
          i18n.language == "en"
            ? "lg:text-left md:text-left text-center"
            : "lg:text-right md:text-right text-center"
        }`}
      >
        الشركاء الداعمون
      </p>
      <div className="mb-32">
        <Carousel sponsers={SupportingPartners} />
      </div>
    </section>
  );
};

export default Sponser;
