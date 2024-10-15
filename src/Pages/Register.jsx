import React, { useEffect, useState } from "react"; // Import useState
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
  const [showModal, setShowModal] = useState();
  const [termsAndConditions, setTermsAndCondtions] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchTerms = async (pageUrl = `${BASE_URL}terms/and/condiation`) => {
    const params = {
      // dataLimit: 3,
    };
    try {
      const response = await axios.get(pageUrl, {
        params,
        headers: {
          "Accept-Language": i18n.language,
        },
      });
      console.log(response);
      setTermsAndCondtions(response?.data?.data?.details);
    } catch (error) {
      console.error("Error fetching terms:", error);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, [i18n.language]);

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false, // Checkbox state
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t("validation.nameRequired")),
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.emailRequired")),
    phone: Yup.string().required(t("validation.phoneRequired")),
    password: Yup.string()
      .min(6, t("validation.passwordMinLength"))
      .required(t("validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("validation.passwordsMustMatch"))
      .required(t("validation.confirmPasswordRequired")),
    termsAccepted: Yup.boolean().oneOf([true], t("validation.termsRequired")), // Checkbox validation
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post(`${BASE_URL}register`, values, {
        headers: {
          "Accept-Language": i18n.language,
        },
      })
      .then((response) => {
        toast.success(t("success.registrationSuccessful"));
        resetForm();
        const homeRoute = i18n.language === "ar" ? "/ar" : "/en";
        localStorage.setItem("authUser", JSON.stringify(response?.data?.data));
        localStorage.setItem(
          "authToken",
          JSON.stringify(response?.data?.token)
        );
        navigate(homeRoute);
      })
      .catch((error) => {
        console.error("There was an error login!", error);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // Open modal function
  const openModal = (service) => {
    setShowModal(service);
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(null);
  };

  // Handle closing modal by clicking on background
  const handleBackgroundClick = (e) => {
    // Check if the clicked area is the background (outside the modal content)
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 py-8"
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
          {({ isSubmitting }) => (
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
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 min-h-[48px]"
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
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 min-h-[48px]"
                  />
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

              {/* Terms and Conditions Checkbox */}
              <div className="mb-4 flex items-center">
                <Field
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  className="mx-2"
                  required
                />
                <label htmlFor="termsAccepted" className="cursor-pointer">
                  {t("form.acceptTerms")}{" "}
                  <span
                    className="text-[#2481ce] underline"
                    onClick={openModal}
                  >
                    {t("form.terms&conditions")}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2481ce] text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("form.submitting") : t("form.register")}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center modal-overlay"
          dir="ltr"
          onClick={handleBackgroundClick} // Handle background click
        >
          <div
            className="bg-white w-[90%] lg:w-[80%] lg:min-h-[450px] xl:w-[80%] max-w-5xl rounded-lg overflow-hidden relative p-8"
            onClick={(e) => e.stopPropagation()} // Prevent modal content click from closing the modal
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-5 text-4xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <p className="text-3xl my-5 border-b-2 border-black pb-1 w-fit mx-auto">
              {" "}
              {t("form.terms&conditions")}
            </p>
            <div className="flex flex-col lg:flex-row">
              {termsAndConditions}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
