import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    setAuthUser(JSON.parse(localStorage.getItem("authUser")));
  }, []);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const onSubmit = () => {
    axios
      .post(
        `${BASE_URL}logout`,
        {},
        {
          headers: {
            "Accept-Language": i18n.language,
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("authToken")
            )}`,
          },
        }
      )
      .then((response) => {
        const homeRoute = i18n.language === "ar" ? "/ar" : "/en";
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
        navigate(homeRoute);
        window.location.href = homeRoute;
      })
      .catch((error) => {
        console.error("There was an error login!", error);
        toast.error("هناك خطأ حاول مرة أخرى");
      })
      .finally(() => {
        toast.error();
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-100 py-8 mt-[64px] px-6"
      dir={i18n.language === "en" ? "ltr" : "rtl"}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <FaUserCircle size={100} color="#2481ce" />
        </div>

        {/* Profile Info as Rows */}
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <span className="font-semibold" style={{ color: "#2481ce" }}>
              {t("profile.name")} :
            </span>
            <span className="text-gray-600">{authUser?.name}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold" style={{ color: "#2481ce" }}>
              {t("profile.email")} :
            </span>
            <span className="text-gray-600">{authUser?.email}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-semibold" style={{ color: "#2481ce" }}>
              {t("profile.phone")} :
            </span>
            <span className="text-gray-600">{authUser?.phone}</span>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div
          className="text-center"
          onClick={() => {
            onSubmit();
          }}
        >
          <button className="bg-[#2481ce] text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
            {t("profile.logout")}
          </button>
        </div>
        {/* <div className="text-center">
          <button className="bg-[#2481ce] text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
            {t("profile.editProfile")}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
