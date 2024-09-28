import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className="min-h-[calc(100vh-74px)] py-16 px-6 bg-gray-100 flex items-center"
      dir="rtl"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        {/* Image on the Left */}

        {/* Text on the Right */}
        <div className="md:w-1/2 w-full md:pl-12 text-center">
          {/* Title */}
          <h2 className="text-4xl font-extrabold mb-6 text-[#2481ce]">
            من نحن
          </h2>

          {/* Divider */}
          <div className="h-1 w-20 bg-[#2481ce] mb-6 mx-auto"></div>

          {/* Description */}
          <p className="text-lg text-gray-700  detilas-p">
            نحن شركة متخصصة في تقديم أفضل الحلول والخدمات، ملتزمون بالابتكار
            والجودة. رؤيتنا هي المساهمة في تطوير الصناعات من خلال التكنولوجيا
            المتقدمة والإبداع. نقدم خدماتنا بفخر لعملائنا في جميع أنحاء العالم
            مع التركيز على تلبية احتياجاتهم وتقديم أفضل النتائج الممكنة. نحن
            شركة متخصصة في تقديم أفضل الحلول والخدمات، ملتزمون بالابتكار
            والجودة. رؤيتنا هي المساهمة في تطوير الصناعات من خلال التكنولوجيا
            المتقدمة والإبداع. نقدم خدماتنا بفخر لعملائنا في جميع أنحاء العالم
            مع التركيز على تلبية احتياجاتهم وتقديم أفضل النتائج الممكنة. مع
            التركيز على تلبية احتياجاتهم وتقديم أفضل النتائج الممكنة. نحن شركة
            متخصصة في تقديم أفضل الحلول والخدمات، ملتزمون بالابتكار والجودة.
            رؤيتنا هي المساهمة في تطوير الصناعات من خلال التكنولوجيا المتقدمة
            والإبداع. نقدم خدماتنا بفخر لعملائنا في جميع أنحاء العالم مع التركيز
            على تلبية احتياجاتهم وتقديم أفضل النتائج الممكنة
          </p>

          {/* Call to Action */}
          <Link
            to={`/${i18n.language}/about`}
            className="inline-block px-8 py-3 my-8 bg-[#2481ce] text-white font-semibold rounded-full shadow-md hover:bg-[#1c669b] transition duration-300"
          >
            اكتشف المزيد
          </Link>
        </div>

        <div className="md:w-1/2 w-full mb-8 md:mb-0 relative">
          <img
            src="https://via.placeholder.com/500x300"
            alt="About us"
            className="rounded-lg shadow-lg transform transition duration-500 hover:scale-105 mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
