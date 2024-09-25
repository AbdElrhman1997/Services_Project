import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const GetNewUpdates = () => {
  let validateSchema = Yup.object({
    email: Yup.string().email("Invalid email address"),
  });

  const handleSave = async (values) => {
    try {
      await validateSchema.validate(values, { abortEarly: false });

      const valuesToSend = {
        email: values?.email,
      };

      axios.post("testapi/getnew", valuesToSend).then((res) => {
        if (res && res.status) {
          toast.success(res?.message, {
            position: "top-center",
            hideProgressBar: false,
            autoClose: 3000,
            progress: undefined,
          });
          // add to local storage
        } else {
          toast.error(res?.message, {
            position: "top-center",
            hideProgressBar: false,
            autoClose: 3000,
            progress: undefined,
          });
        }
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
      } else {
      }
    }
  };

  return (
    <section>
      <p
        style={{
          color: "#44add2",
          fontWeight: "bold",
        }}
        className="text-2xl mt-12 mb-8"
      >
        احصل علي التحديثات الخاصة بالحدث
      </p>
      <div
        style={{ backgroundColor: "#f6f5f5" }}
        className="rounded-2xl py-4 px-10 w-fit mx-auto mb-16"
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validateSchema}
          onSubmit={(values, formikBag) => {
            console.log(formikBag);
            formikBag.setErrors({});
          }}
        >
          {({
            handleSubmit,
            errors,
            touched,
            values,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex justify-center items-center gap-x-4"
            >
              <Field
                type="email"
                name="email"
                placeholder="أدخل البريد الإلكتروني"
                className="lg:w-96 text-right rounded-xl border-none py-4 px-4"
              />
              <ErrorMessage name="email" component="div" />
              <button
                type="submit"
                onClick={() => {
                  console.log(values, errors);
                  handleSave(values);
                }}
                style={{ backgroundColor: "#44add2" }}
                className="py-3 px-12 rounded-xl text-white font-bold "
              >
                أرسل
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default GetNewUpdates;
