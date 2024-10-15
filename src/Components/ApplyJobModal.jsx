import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";

const ApplyJobModal = ({
  handleBackgroundApplyClick,
  closeApplyModal,
  employment_id,
}) => {
  console.log(employment_id);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t("validation.coverLetter_required")),
    cv: Yup.array().min(1, t("validation.file_required")),
  });

  // Handle file uploads using Dropzone
  const handleDrop = (acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: ".pdf,.doc,.docx",
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("description", values.description);
    formData.append("cv", uploadedFiles[0]);
    formData.append("employment_id", employment_id);
    axios
      .post(`${BASE_URL}applied/for/job`, formData, {
        headers: {
          "Accept-Language": i18n.language,
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("authToken")
          )}`,
        },
      })
      .then((response) => {
        toast.success(response?.data?.message);
        closeApplyModal();
      })
      .catch((error) => {
        console.error("There was an error login!", error);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center modal-overlay rtl:text-right ltr:text-left min-h-screen"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      onClick={handleBackgroundApplyClick} // Handle background click
    >
      <div
        className="bg-white w-[90%] lg:w-[80%]  xl:w-[80%] max-w-5xl rounded-lg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // Prevent modal content click from closing the modal
      >
        <button
          onClick={() => {
            closeApplyModal();
            setUploadedFiles([]);
          }}
          className="absolute top-3 right-5 text-4xl text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <div
          className="flex justify-center items-center  bg-white pt-12"
          dir={i18n.language === "en" ? "ltr" : "rtl"}
        >
          <div className="w-full bg-white rounded-lg p-8">
            <Formik
              initialValues={{}}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="grid grid-cols-2 w-full gap-4 text-black">
                  {/* Cover Letter */}
                  <div className="mb-4 col-span-2">
                    <label
                      htmlFor="description"
                      className={`block font-semibold text-xl text-black mb-3 ${
                        i18n.language === "en" ? "text-left" : "text-right"
                      }`}
                    >
                      {t("common.coverLetter")}
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      placeholder={t("common.coverLetter_placeholder")}
                      className="w-full bg-gray-100 border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                      rows={4}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Dropzone for CV */}
                  <div className="col-span-2">
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed border-gray-300 p-4 rounded cursor-pointer bg-gray-100 py-16"
                    >
                      <input {...getInputProps()} />

                      {uploadedFiles.length > 0 ? (
                        <p className="text-center">{uploadedFiles[0].name}</p>
                      ) : (
                        <p className="text-center">
                          {t("common.dragOrClickToUpload")}
                        </p>
                      )}
                    </div>
                    <ErrorMessage
                      name="cv"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-main text-white font-bold py-2 mb-3 px-4 rounded hover:bg-main_hover transition-colors col-span-2 w-1/2 mx-auto mt-8"
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
    </div>
  );
};

export default ApplyJobModal;
