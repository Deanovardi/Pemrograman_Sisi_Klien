import React from "react";
import LabeledInput from "../Elements/LabeledInput";
import Button from "../Elements/Button";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

function FormSignUp({ onSubmit }) {
  return (
    <>
      {/* form start */}
      <div className="mt-16">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await onSubmit(values.name, values.email, values.password);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* NAME */}
              <div className="mb-6">
                <Field name="name">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      label="Name"
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* EMAIL */}
              <div className="mb-6">
                <Field name="email">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      label="Email Address"
                      id="email"
                      type="email"
                      placeholder="hello@example.com"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <Field name="password">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      label="Password"
                      id="password"
                      type="password"
                      placeholder="***************"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <p className="text-xs text-gray-03 mb-6">
                By continuing, you agree to our{" "}
                <span className="text-primary">terms of service</span>.
              </p>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* form end */}

      {/* teks start */}
      <div className="my-9 px-7 flex flex-col justify-center items-center text-xs text-gray-03 relative">
        <div className="border border-gray-05 w-full"></div>
        <div className="px-2 bg-special-mainBg absolute">or sign up with</div>
      </div>
      {/* teks end */}

      {/* sign up with google start */}
      <div className="mb-8">
        <Button type="button" variant="secondary">
          <span className="flex items-center justify-center">
            {/* icon Google boleh sama persis dengan SignIn */}
            Continue with Google
          </span>
        </Button>
      </div>
      {/* sign up with google end */}

      {/* link start */}
      <div className="flex justify-center">
        <span className="text-gray-03 text-sm mr-1">
          Already have an account?
        </span>
        <Link to="/login" className="text-primary font-bold">
          Sign in here
        </Link>
      </div>
      {/* link end */}
    </>
  );
}

export default FormSignUp;
