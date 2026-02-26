import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserForm = () => {
  const [submittedData, setSubmittedData] = useState(null);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile must be exactly 10 digits")
      .required("Mobile is required"),
  });

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">User Form</h2>

      <Formik
        initialValues={{ name: "", email: "", mobile: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          setSubmittedData(values);
          resetForm();
        }}
      >
        {() => (
          <Form className="flex flex-col gap-3">
            {/* Name */}
            <div>
              <Field
                name="name"
                type="text"
                placeholder="Enter Name"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Enter Email"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Mobile */}
            <div>
              <Field
                name="mobile"
                type="text"
                placeholder="Enter Mobile"
                className="border p-2 w-full"
              />
              <ErrorMessage
                name="mobile"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>

              <button
                type="reset"
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Display Submitted Data */}
      {submittedData && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="font-semibold mb-2">Submitted Data:</h3>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Mobile:</strong> {submittedData.mobile}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserForm;
