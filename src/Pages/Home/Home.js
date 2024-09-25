import React from "react";
import WhatIsEvent from "../../Components/WhatIsEvent/WhatIsEvent";
import DigitalTransformation from "../../Components/DigitalTransformation/DigitalTransformation";
import CoOperation from "../../Components/CoOperation/CoOperation";
import WhyThisEvent from "../../Components/WhyThisEvent/WhyThisEvent";
import SponserMinister from "../../Components/SponserMinister/SponserMinister";
import Creativity from "../../Components/Creativity/Creativity";
import Sponser from "../../Components/Sponser/Sponser";
import "./Home.css";
import EventDetails from "../../Components/EventDetails/EventDetails";
import VideoSection from "../../Components/VideoSection/VideoSection";
import RegisterWithUs from "../../Components/RegisterWithUs/RegisterWithUs";
import GetNewUpdates from "../../Components/GetNewUpdates/GetNewUpdates";

const Home = () => {
  return (
    <>
      <head>
        <title>الرئيسية</title>
      </head>
      <section className="home">
        <section
          className="homeSec relative flex flex-col justify-center"
          data-aos="fade-top"
          data-aos-delay="700"
        ></section>
        <SponserMinister />
        <WhatIsEvent />
        <VideoSection />
        <EventDetails />
        <DigitalTransformation />
        <CoOperation />
        <Creativity />
        <WhyThisEvent />
        <Sponser />
        <RegisterWithUs />
        <GetNewUpdates />
      </section>
    </>
  );
};

export default Home;
