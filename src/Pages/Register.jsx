import React, { useState } from "react"; // Import useState
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t("validation.nameRequired")),
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
    phone: Yup.string()
      .matches(/^05\d{8}$/, t("validation.invalidPhone"))
      .required(t("validation.phoneRequired")),
    password: Yup.string()
      .min(6, t("validation.passwordMinLength"))
      .required(t("validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.passwordsMustMatch"))
      .required(t("validation.confirmPasswordRequired")),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post(`${BASE_URL}register`, values)
      .then((response) => {
        toast.success(t("success.registrationSuccessful"));
        resetForm();
        const homeRoute = i18n.language === "ar" ? "/ar" : "/en";
        navigate(homeRoute);
      })
      .catch((error) => {
        console.error("There was an error login!", error);
        toast.error(t("error.registrationFailed"));
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      dir={i18n.language === "en" ? "ltr" : "rtl"}
    >
      <div
        className={`w-full max-w-md bg-white shadow-lg rounded-lg p-8 ${
          i18n.language === "en" ? "text-left" : "text-right"
        }`}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#2481ce" }}
        >
          {t("form.register")}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                {/* Name */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className={`block font-semibold ${
                      i18n.language === "en" ? "text-left" : "text-right"
                    }`}
                  >
                    {t("form.name")}
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1 font-semibold"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className={`block font-semibold ${
                      i18n.language === "en" ? "text-left" : "text-right"
                    }`}
                  >
                    {t("form.email")}
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1 font-semibold"
                  />
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className={`block font-semibold ${
                      i18n.language === "en" ? "text-left" : "text-right"
                    }`}
                  >
                    {t("form.phone")}
                  </label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm mt-1 font-semibold"
                  />
                </div>

                {/* Password */}
                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className={`block font-semibold ${
                      i18n.language === "en" ? "text-left" : "text-right"
                    }`}
                  >
                    {t("form.password")}
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 min-h-[48px]" // Set a minimum height
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-1/2 transform -translate-y-1/2 cursor-pointer ${
                        i18n.language === "en" ? "right-2" : "left-2"
                      }`}
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1 font-semibold"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-6 relative">
                  <label
                    htmlFor="confirmPassword"
                    className={`block font-semibold ${
                      i18n.language === "en" ? "text-left" : "text-right"
                    }`}
                  >
                    {t("form.confirmPassword")}
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 min-h-[48px]" // Set a minimum height
                    />
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      } // Toggle visibility on click
                      className={`absolute top-1/2 transform -translate-y-1/2 cursor-pointer ${
                        i18n.language === "en" ? "right-2" : "left-2"
                      }`}
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </div>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1 font-semibold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2481ce] text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("form.submitting") : t("form.register")}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
