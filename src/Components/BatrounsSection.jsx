import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const BatrounsSection = () => {
  const [batrouns, setBatrouns] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { t, i18n } = useTranslation();

  const fetchBatrouns = async (pageUrl = `${BASE_URL}batrouns`) => {
    const params = {
      dataLimit: 3,
    };
    try {
      const response = await axios.get(pageUrl, {
        params,
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      const data = response.data.data;
      setBatrouns(data.data);
    } catch (error) {
      console.error("Error fetching Courses :", error);
    }
  };

  // Fetch my courses

  useEffect(() => {
    fetchBatrouns();
  }, [i18n.language]);

  return (
    <section>
      <div
        className="bg-[#333] xl:py-8 lg:py-8 md:py-8 pt-4 pb-8 xl:px-16 lg:px-16 md:px-8 px-4"
        style={{ borderRadius: "0 0 100px 100px" }}
        dir="rtl"
      >
        <div className="flex flex-wrap justify-center xl:text-[1.7rem] lg:text-[1.2rem] md:text-[1rem] text-[14px] text-center leading-relaxed font-semibold">
          <p className="hover:text-[#ec3237] transition  duration-400 cursor-pointer">
            بناء العلامة التجارية
          </p>
          <span className="text-[#ec3237] mx-[6px] font-bold">|</span>
          <p className="hover:text-[#ec3237] transition  duration-400 cursor-pointer">
            بناء الهوية المكانية و المعارض
          </p>
          <span className="text-[#ec3237] mx-[6px] font-bold">|</span>
          <p className="hover:text-[#ec3237] transition  duration-400 cursor-pointer">
            تصميم المواقع الإلكترونية و المتاجر و برمجتها
          </p>
          <span className="text-[#ec3237] mx-[6px] font-bold">|</span>
          <p className="hover:text-[#ec3237] transition  duration-400 cursor-pointer">
            التسويق و الإعلان
          </p>
          <span className="text-[#ec3237] mx-[6px] font-bold">|</span>
          <p className="hover:text-[#ec3237] transition  duration-400 cursor-pointer">
            التصوير و الإنتاج
          </p>
          <span className="text-[#ec3237] mx-[6px] font-bold">|</span>
          <p className="hover:text-[#ec3237] transition  duration-400 cursor-pointer">
            إدارة وسائل التواصل الإجتماعي
          </p>
          <span className="text-[#ec3237] mx-[6px] font-bold">|</span>
          <p className="hover:text-[#ec3237] transition  duration-400 cursor-pointer">
            الصناعة
          </p>
          <span className="text-[#ec3237] mx-[6px] font-bold">|</span>
          <p className="hover:text-[#ec3237] transition  duration-400 cursor-pointer">
            الطباعة
          </p>
        </div>
      </div>
      <div className="grid grid-cols-6 xl:px-16 lg:px-16 md:px-8 px-4 gap-4 my-8">
        {batrouns?.map((item, index) => {
          return (
            <div
              key={index + 1}
              className="relative xl:col-span-2 lg:col-span-2 md:col-span-3 col-span-6 cursor-pointer overflow-hidden group" // Added 'group' for hover control
            >
              <img
                src={item?.image}
                alt={item?.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110" // Added group-hover
              />
              <div className="service-hover w-full h-full absolute top-0 left-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute bottom-6 left-0 mx-4 text-right font-bold transition-all duration-300 ease-in-out">
                <p className="text-white text-[17px]  opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                  {item?.name}
                </p>
                <p className="text-white text-[13px] opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
                  {item?.detials}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-full bg-[#ec3237] w-fit px-24 py-[10px] mt-4 font-bold xl:text-xl lg:text-xl md:text-xl text-md mx-auto my-16">
        إبداعتنا
      </div>
    </section>
  );
};

export default BatrounsSection;
