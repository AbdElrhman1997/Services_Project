import React from "react";
import HomeBackgrounds from "../Components/HomeBackgrounds";
import NewsTicker from "../Components/NewsTicker";
import ConsultationsSection from "../Components/ConsultationsSection";
import ServicesSection from "../Components/ServicesSection";
import LanguageToggle from "../Components/LanguageToggle";
import CoursesSection from "../Components/CoursesSection";
import EmploymentSection from "../Components/EmploymentSection";
import ContactSection from "../Components/ContactSection";
import AboutSection from "../Components/AboutSection";

const Home = () => {
  return (
    <>
      <head>
        <title>الرئيسية</title>
      </head>
      <section>
        <HomeBackgrounds />
        <AboutSection />
        <NewsTicker />
        <ServicesSection />
        <CoursesSection />
        <ConsultationsSection />
        <EmploymentSection />
        <ContactSection />
      </section>
    </>
  );
};

export default Home;
