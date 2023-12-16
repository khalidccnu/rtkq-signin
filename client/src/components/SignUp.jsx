import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSignUpMutation } from "../redux/auth/authAPI.js";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name should be of minimum 3 characters length")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignUp = () => {
  const closeRef = useRef(null);
  const [signUp, { isLoading }] = useSignUpMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      const response = await signUp(values);

      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        closeRef.current.click();
        toast.success(response.data.message);
        formikHelpers.resetForm();
      }
    },
  });

  return (
    <div className="modal-box max-w-sm">
      <div className={`flex justify-between items-center`}>
        <div>
          <h3 className="font-bold text-lg">Sign Up</h3>
          <p className="text-gray-500">It's quick and easy.</p>
        </div>
        <form method="dialog">
          <button className="btn focus:outline-0" ref={closeRef}>
            Close
          </button>
        </form>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="form-control grid grid-cols-1 gap-4 mt-5"
      >
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="input input-sm input-bordered rounded w-full focus:outline-0"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && Boolean(formik.errors.name) ? (
            <small className="text-red-600 ml-0.5">
              {formik.touched.name && formik.errors.name}
            </small>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input input-sm input-bordered rounded w-full focus:outline-0"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && Boolean(formik.errors.email) ? (
            <small className="text-red-600 ml-0.5">
              {formik.touched.email && formik.errors.email}
            </small>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="New password"
            name="password"
            className="input input-sm input-bordered rounded w-full focus:outline-0"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && Boolean(formik.errors.password) ? (
            <small className="text-red-600 ml-0.5">
              {formik.touched.password && formik.errors.password}
            </small>
          ) : null}
        </div>
        <button
          type="submit"
          className="btn btn-sm w-full bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 !border-blue-500 rounded normal-case"
        >
          <span>Signup</span>
          {isLoading ? (
            <span
              className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
              role="status"
            ></span>
          ) : null}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
