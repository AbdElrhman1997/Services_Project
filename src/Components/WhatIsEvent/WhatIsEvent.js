import React from "react";

import "./WhatIsEvent.css";
import { useTranslation } from "react-i18next";

const WhatIsEvent = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className="what-is-event px-16 mb-20"
      dir={i18n.language == "en" ? "ltr" : "rtl"}
    >
      <div className="lg:grid md:grid grid-cols-12">
        <div
          className={`lg:col-span-3 md:col-span-3 col-span-12 ${
            i18n.language == "en" ? "text-left" : "text-right"
          }`}
        >
          <p
            style={{
              color: "#44add2",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            ما هو
          </p>
          <p
            style={{
              color: "#103783",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            المؤتمر والمعرض الدولي لإدارة المرافق
          </p>
        </div>
        <div className=" lg:col-span-9 md:col-span-9 col-span-12">
          <p
            className={`text-sm leading-loose ${
              i18n.language == "en" ? "text-left" : "text-right"
            }`}
          >
            المؤتمر والمعرض الدولي لإدارة المرافق هو الأول من نوعه في المنطقة،
            يهدف إلى توفير منصة عالميــة موحــدة تجمــع جميــع الأطـراف من
            قطاعات ومؤسسات وخبراء وأكاديمييـن وصنـاع القـرار والمهتمين لمشاركة
            المعرفة وأفضل الممارسات العالمية وتبادل الخبرات حول أحدث التطورات
            والممارسات المتعلقة بإدارة المرافق ، والخروج بحلول إبداعية تساعد على
            مواجهة التحديات المشتركة وتعزيز الاستدامة والكفاءة، والتركيز على
            أداء أبرز الجهات والــقطاعــــات، بمـــشــاركــــة أكثـــر مــن 50
            متحـــدث وخبيــــر، الـذي يخــدم فـــي مجمله أهداف ورؤية المملكة
            2030.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsEvent;
