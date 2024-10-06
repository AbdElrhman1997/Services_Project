import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ApplyJobModal = ({ handleBackgroundApplyClick, closeApplyModal }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
    password: Yup.string()
      .min(6, t("validation.passwordMinLength"))
      .required(t("validation.passwordRequired")),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post(`${BASE_URL}login`, values, {
        headers: {
          "Accept-Language": i18n.language,
        },
      })
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
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center modal-overlay rtl:text-right ltr:text-left"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      onClick={handleBackgroundApplyClick} // Handle background click
    >
      <div
        className="bg-white w-[90%] lg:w-[80%] lg:min-h-[450px] xl:w-[80%] max-w-5xl rounded-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal content click from closing the modal
      >
        <button
          onClick={closeApplyModal}
          className="absolute top-3 right-5 text-4xl text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <div
          className="flex justify-center items-center min-h-screen bg-white"
          dir={i18n.language === "en" ? "ltr" : "rtl"}
        >
          <div className="w-full bg-white rounded-lg p-8">
            <h2
              className="text-3xl font-bold mb-6 text-center"
              style={{ color: "#2481ce" }}
            >
              {t("HomePage.Header.login")}
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="grid grid-cols-2 w-full gap-4">
                  {/* Email */}
                  <div className="mb-4 xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-2">
                    <label
                      htmlFor="email"
                      className={`block font-semibold text-xl ${
                        i18n.language === "en" ? "text-left" : "text-right"
                      }`}
                    >
                      {t("form.firstName")}
                    </label>
                    <Field
                      type="text"
                      id="first_name"
                      name="first_name"
                      className="w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="mb-4 xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-2">
                    <label
                      htmlFor="last_name"
                      className={`block font-semibold text-xl ${
                        i18n.language === "en" ? "text-left" : "text-right"
                      }`}
                    >
                      {t("form.lastName")}
                    </label>
                    <Field
                      type="text"
                      id="last_name"
                      name="last_name"
                      className="w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#2481ce] text-white font-bold py-2 px-4 rounded hover:bg-blue-500 transition-colors col-span-2 w-1/2 mx-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? t("form.submitting")
                      : t("HomePage.Header.login")}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobModal;
