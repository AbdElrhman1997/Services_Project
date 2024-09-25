import React from "react";
import "./VideoSection.css";
import { useTranslation } from "react-i18next";
import VisionImage from "../../Images/Vision.png";
import MessageImage from "../../Images/Message.png";
import ParticipantsImage from "../../Images/Participants.png";
import sloganImage from "../../Images/slogan.png";

const VideoSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className=" px-16"
      dir={i18n.language == "en" ? "ltr" : "rtl"}
      style={{ textAlign: i18n.language == "en" ? "left" : "right" }}
    >
      <div className="lg:grid md:grid grid-cols-12 gap-6 ">
        <div className=" lg:col-span-3 col-span-12 lg:my-6 md:my-6 my-16 md:flex md:justify-start md:gap-x-2 sm:flex sm:justify-around sm:gap-x-2 lg:flex-col">
          <div className="mx-auto lg:my-0 md:my-0 sm:my-0 my-4">
            <div className="flex gap-x-2">
              <img
                className="w-12 h-12 object-contain"
                src={VisionImage}
                alt="VisionImage"
              />
              <p
                className="text-3xl font-bold "
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "#44add2",
                  margin: "auto 0",
                }}
              >
                الرؤية
              </p>
            </div>
            <p style={{ color: "#023047", fontSize: "14px", width: "220px" }}>
              تعـــزيز مفهــوم الريـــادة العالميــة في إدارة المرافق.
            </p>
          </div>
          <div className="mx-auto lg:my-0 md:my-0 sm:my-0 my-4">
            <div className="flex gap-x-2">
              <img
                className="w-12 h-12 object-contain"
                src={MessageImage}
                alt="MessageImage"
              />
              <p
                className="text-3xl font-bold "
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "#44add2",
                  margin: "auto 0",
                }}
              >
                الرسالة
              </p>
            </div>
            <p style={{ color: "#023047", fontSize: "14px", width: "220px" }}>
              أن يكون المؤتمر هو المنصة الداعمة لقطاع إدارة المرافق من خلال نشر
              الوعي وأفضل الممارسات العالمية للارتقاء بقطاع إدارة المرافق في
              المنطقة وفقًا لأفضل المعايير.
            </p>
          </div>
        </div>

        <div
          className=" lg:col-span-6 col-span-12 lg:my-6 md:my-6 my-16"
          style={{ backgroundColor: "rebeccapurple" }}
        >
          <video width={500} height={300}>
            <source
              src="blob:https://www.youtube.com/03ea42c6-cd2e-4a3a-8ec0-2a3be20ca60f"
              type="video/mp4"
            ></source>
            <source
              src="blob:https://www.youtube.com/03ea42c6-cd2e-4a3a-8ec0-2a3be20ca60f"
              type="video/ogg"
            ></source>
            <source
              src="blob:https://www.youtube.com/03ea42c6-cd2e-4a3a-8ec0-2a3be20ca60f"
              type="video/webm"
            ></source>
            هذا االمتصفح لا يدعم الفيديوهات
          </video>
        </div>

        <div className=" lg:col-span-3 col-span-12 lg:my-6 md:my-6 my-16 md:flex md:justify-start md:gap-x-2 sm:flex sm:justify-around sm:gap-x-2 lg:flex-col">
          <div className="mx-auto lg:my-0 md:my-0 sm:my-0 my-4">
            <div className="flex gap-x-2">
              <img
                className="w-12 h-12 object-contain"
                src={ParticipantsImage}
                alt="ParticipantsImage"
              />
              <p
                className="text-3xl font-bold "
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "#44add2",
                  margin: "auto 0",
                }}
              >
                المشاركون
              </p>
            </div>
            <p style={{ color: "#023047", fontSize: "14px", width: "220px" }}>
              يضـــم المعـــرض عــدد مـن المشاركيــــن مـن القطاعـات العامة
              والخاصة، ومنصة للقــاء خبــــــراء وأكـــاديمييـن وصنــاع القــرار
              و المهتمين بمجال إدارة المرافق.
            </p>
          </div>
          <div className="mx-auto lg:my-0 md:my-0 sm:my-0 my-4">
            <div className="flex gap-x-2">
              <img
                className="w-12 h-12 object-contain"
                src={sloganImage}
                alt="sloganImage"
              />
              <p
                className="text-3xl font-bold "
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "#44add2",
                  margin: "auto 0",
                }}
              >
                شعارنا
              </p>
            </div>
            <p style={{ color: "#023047", fontSize: "14px", width: "220px" }}>
              مستقبل مستدام
            </p>
          </div>
        </div>
        {/* <div className=" lg:col-span-3 col-span-12 lg:my-6 md:my-6 my-16 md:flex md:justify-start md:gap-x-2 sm:flex sm:justify-around sm:gap-x-2 lg:flex-col">
          <div className=" lg:my-0 md:my-0 sm:my-0 my-4">
            <div className="flex gap-x-2">
              <img
                className="w-12 h-12 object-contain"
                src={ParticipantsImage}
                alt="VisionImage"
              />
              <p
                className="text-3xl font-bold "
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "#44add2",
                  margin: "auto 0",
                }}
              >
                المشاركون
              </p>
            </div>
            <p style={{ color: "#023047", fontSize: "14px", width: "300px" }}>
              يضـــم المعـــرض عــدد مـن المشاركيــــن مـن القطاعـات العامة
              والخاصة، ومنصة للقــاء خبــــــراء وأكـــاديمييـن وصنــاع القــرار
              و المهتمين بمجال إدارة المرافق.
            </p>
          </div>

          <div className="lg-mx-0 md-mx-0 sm-mx-0  lg:my-0 md:my-0 sm:my-0 my-4">
            <div className="flex gap-x-2">
              <img
                className="w-12 h-12 object-contain"
                src={sloganImage}
                alt="VisionImage"
              />
              <p
                className="text-3xl font-bold "
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  lineHeight: "28px",
                  color: "#44add2",
                  margin: "auto 0",
                }}
              >
                شعارنا
              </p>
            </div>
            <p style={{ color: "#023047", fontSize: "14px", width: "300px" }}>
              مستقبل مستدام
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default VideoSection;

// data-aos='fade-top' data-aos-delay='200'
