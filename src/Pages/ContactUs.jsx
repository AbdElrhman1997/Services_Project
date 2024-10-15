import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { IoPhonePortrait, IoShareSocialSharp } from "react-icons/io5";
import { FaLocationDot, FaPhoneFlip, FaSnapchat } from "react-icons/fa6";

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const [settingsData, setSettingsData] = useState();
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}services/provided`,
          {
            headers: {
              "Accept-Language": i18n.language,
            },
          }
        );
        const data = JSON.stringify(response?.data?.data, null, 2);
        console.log(data);
        setServices(JSON.parse(data));
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, [i18n.language]);
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}setting`,
          {
            headers: {
              "Accept-Language": i18n.language,
            },
          }
        );
        const data = JSON.stringify(response?.data?.data, null, 2);
        setSettingsData(JSON.parse(data));
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, [i18n.language]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t("contact_validation.name_min", { count: 2 }))
      .max(50, t("contact_validation.name_max", { count: 50 }))
      .required(t("contact_validation.name_required")),

    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, t("contact_validation.phone_invalid"))
      .required(t("contact_validation.phone_required")),

    city: Yup.string()
      .max(50, t("contact_validation.city_max", { count: 50 }))
      .required(t("contact_validation.city_required")),

    service_provider_id: Yup.object()
      .shape({
        value: Yup.number().required(
          t("contact_validation.service_provider_required")
        ),
        label: Yup.string(),
      })
      .nullable()
      .required(t("contact_validation.service_provider_required")),

    message: Yup.string()
      .max(1000, t("contact_validation.message_max", { count: 1000 }))
      .required(t("contact_validation.message_required")),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios
      .post(
        `${BASE_URL}contact/us`,
        { ...values, service_provider_id: values?.service_provider_id?.value },
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
      )
      .then((response) => {
        toast.success(t("contact_validation.success_message"));
        resetForm();
      })
      .catch((error) => {
        console.error("There was an error login!", error);
        toast.error(t("error.registrationFailed"));
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "transparent" : "transparent", // Change border color when focused
      boxShadow: state.isFocused ? "0 0 0 2px rgba(36, 129, 206, 0.3)" : null, // Custom shadow on focus
      outline: state.isFocused ? "transparent" : null, // Custom shadow on focus
      // borderColor: state.isFocused ? "#ec3237" : "#ced4da",
      "&:hover": {
        borderColor: "transparent", // Border color on hover
      },
      "&:focus": {
        borderColor: "transparent", // Border color on hover
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#2482ced8" // Background color when option is selected (custom color)
        : state.isFocused
        ? "#e9ecef" // Background color when option is focused/hovered
        : null,
    }),
    menu: (base) => ({
      ...base,
    }),
  };

  const ServicesOptions = services.map((service) => ({
    value: service.id,
    label: service.name,
  }));

  return (
    <section
      className={`contact-us relative min-h-screen text-right mt-[64px] ${
        i18n.language === "en" ? "text-left" : "text-right"
      }`}
      dir={i18n.language === "en" ? "ltr" : "rtl"}
    >
      <div className="w-full min-h-screen bg-[#2482ce6a] pb-16 xl:px-16 lg:px-16 px-2">
        <div className="pt-16 text-center mb-10">
          <p className="text-white text-4xl font-bold mb-4">
            {t("contact.title")}
          </p>
          <p className="text-white xl:text-2xl lg:text-2xl md:text-2xl text-lg font-bold my-2">
            {t("contact.description")}{" "}
          </p>
        </div>
        <div className="grid grid-cols-2 ">
          <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-2 flex flex-col justify-around my-8">
            <div>
              <p className="text-sm mb-2 flex items-start xl:text-right lg:text-right md:text-right text-center xl:justify-start lg:justify-start md:justify-start justify-center gap-x-2">
                <div className="border-2 border-white rounded-full p-3 mt-1 mx-1 bg-white">
                  <FaLocationDot className="font-bold text-2xl text-main" />
                </div>
                <div
                  className={`min-w-[220px] ${
                    i18n.language === "en" ? "text-left" : "text-right"
                  }`}
                >
                  <p className="text-white xl:text-3xl lg:text-3xl md:text-3xl text-2xl font-bold mb-3">
                    {t("contact.email")}
                  </p>
                  <div className="text-xl text-white">
                    {settingsData?.email}
                  </div>
                </div>
              </p>
            </div>
            <div className="my-8">
              <p className="text-sm mb-2 flex items-start xl:text-right lg:text-right md:text-right text-center xl:justify-start lg:justify-start md:justify-start justify-center gap-x-2">
                <div className="border-2 border-white rounded-full p-3 mt-1 mx-1 bg-white">
                  <FaPhoneFlip className="font-bold text-2xl text-main" />
                </div>
                <div
                  className={`min-w-[220px] ${
                    i18n.language === "en" ? "text-left" : "text-right"
                  }`}
                >
                  <p className="text-white xl:text-3xl lg:text-3xl md:text-3xl text-2xl font-bold mb-3">
                    {t("contact.phone")}
                  </p>
                  <div className="text-xl text-white">
                    {settingsData?.support_whatsapp}
                  </div>
                </div>
              </p>
            </div>
            <div>
              <p className="text-sm mb-2 flex items-start xl:text-right lg:text-right md:text-right text-center xl:justify-start lg:justify-start md:justify-start justify-center gap-x-2">
                <div className="border-2 border-white rounded-full p-3 mt-1 mx-1 bg-white">
                  <IoShareSocialSharp className="font-bold text-2xl text-main" />
                </div>
                <div
                  className={`min-w-[220px] ${
                    i18n.language === "en" ? "text-left" : "text-right"
                  }`}
                >
                  <p className="text-white xl:text-3xl lg:text-3xl md:text-3xl text-2xl font-bold mb-3">
                    {t("contact.follow_us")}
                  </p>
                  <div className="text-xl text-white">
                    <ul className="flex gap-x-6 xl:justify-start lg:justify-start md:justify-start justify-center">
                      <li className="my-2">
                        <a
                          href={`${settingsData?.x}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#2481ce] text-lg flex items-center"
                        >
                          <FaTwitter className="mr-2 text-3xl" />
                        </a>
                      </li>
                      <li className="my-2">
                        <a
                          href={`${settingsData?.insta}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#2481ce] text-lg flex items-center"
                        >
                          <FaInstagram className="mr-2 text-3xl" />
                        </a>
                      </li>
                      <li className="my-2">
                        <a
                          href={`${settingsData?.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#2481ce] text-lg flex items-center"
                        >
                          <FaFacebook className="mr-2 text-3xl" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </p>
            </div>
          </div>
          <div
            className={`xl:col-span-1 lg:col-span-1 md:col-span-1 col-span-2 bg-white px-8 py-8 ${
              i18n.language === "en" ? "text-left" : "text-right"
            }`}
          >
            <p className="text-2xl font-bold text-[#212529]">
              {t("contact.sendMessage")}
            </p>
            <Formik
              initialValues={{}}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="grid grid-cols-2 w-full gap-4">
                  {/* Email */}
                  <div className="col-span-2 mt-6 mb-4">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder={t("form.name_placeholder")}
                      className="w-full contact-form-field"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4 col-span-2">
                    <Field
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder={t("form.phone_placeholder")}
                      className="w-full contact-form-field"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4 col-span-2">
                    <Field
                      type="text"
                      id="city"
                      name="city"
                      placeholder={t("form.city_placeholder")}
                      className="w-full contact-form-field"
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="mb-4 col-span-2">
                    <Field name="service_provider_id">
                      {({ field, form }) => (
                        <Select
                          id="service_provider_id"
                          options={ServicesOptions} // Use the transformed options
                          name="service_provider_id"
                          value={values.service_provider_id}
                          onChange={(value) =>
                            setFieldValue("service_provider_id", value)
                          }
                          placeholder={t("form.selectPlaceholder")}
                          className={`w-full contact-form-field ${
                            i18n.language === "en" ? "text-left" : "text-right"
                          }`}
                          styles={customStyles}
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="service_provider_id"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mb-4 col-span-2">
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      placeholder={t("form.message_placeholder")}
                      className="w-full contact-form-field resize-none"
                      rows={4}
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  {/* Last Name */}
                  <button
                    type="submit"
                    className="bg-main text-white font-bold py-2 px-4 rounded hover:bg-[#2482ce] transition-colors col-span-2 w-1/2 mx-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("form.submitting") : t("contact.send")}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
