import React from "react";
import HomeBackgrounds from "../Components/HomeBackgrounds";
import NewsTicker from "../Components/NewsTicker";
import ConsultationsSection from "../Components/ConsultationsSection";
import ServicesSection from "../Components/ServicesSection";
import LanguageToggle from "../Components/LanguageToggle";

const Home = () => {
  return (
    <>
      <head>
        <title>الرئيسية</title>
      </head>
      <section>
        <HomeBackgrounds />
        <NewsTicker />
        <ServicesSection />
        <ConsultationsSection />
      </section>
    </>
  );
};

export default Home;
