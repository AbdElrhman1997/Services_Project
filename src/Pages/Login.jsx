import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
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
      .post(`${BASE_URL}login`, values)
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
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
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
            <Form>
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
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className={`block font-semibold ${
                    i18n.language === "en" ? "text-left" : "text-right"
                  }`}
                >
                  {t("form.password")}
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2481ce] text-white font-bold py-2 px-4 rounded hover:bg-blue-500 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? t("form.submitting")
                  : t("HomePage.Header.login")}
              </button>

              {/* Register link */}
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  {t("form.noAccount")}{" "}
                  <Link
                    to={`/${i18n.language}/register`}
                    className="text-[#2481ce] hover:underline"
                  >
                    {t("form.registerHere")}
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
