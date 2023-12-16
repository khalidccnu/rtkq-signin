import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSignInMutation } from "../redux/auth/authAPI.js";
import SignUp from "../components/SignUp.jsx";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [signIn, { isLoading }] = useSignInMutation();
  const fromURL = location.state?.fromURL.pathname;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await signIn(values);

      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        navigate(fromURL || "/dashboard");
        toast.success(response.data.message);
      }
    },
  });

  useEffect(() => {
    if (fromURL)
      toast.error(
        "Only registered user can access this page. Please, login first!"
      );
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        <div className="card sm:max-w-sm sm:mx-auto bg-sky-100">
          <div className="card-body">
            <form
              className="form-control gap-y-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input input-sm input-bordered border-blue-500 rounded w-full focus:outline-0 text-blue-500"
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
                  placeholder="Password"
                  name="password"
                  className="input input-sm input-bordered border-blue-500 rounded w-full focus:outline-0 text-blue-500"
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
                <span>SignIn</span>
                {isLoading ? (
                  <span
                    className="inline-block h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin"
                    role="status"
                  ></span>
                ) : null}
              </button>
              <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-2">
                <span>New?</span>
                <span
                  className="text-blue-500 hover:text-blue-500/70 w-fit cursor-pointer transition-colors duration-500"
                  onClick={() => window.signup_modal.showModal()}
                >
                  Create New Account
                </span>
              </div>
            </form>
          </div>
        </div>
        <dialog id="signup_modal" className="modal">
          <SignUp />
        </dialog>
      </div>
    </section>
  );
};

export default SignIn;
