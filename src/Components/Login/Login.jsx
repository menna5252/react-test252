import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  const { setToken } = useContext(UserContext);

  const [errorMsg, setErrorMsg] = useState("");

  const [forgetPErrorMsg, setforgetPErrorMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [showForget, setShowForget] = useState(false);

  const [forgetPasswordMessage, setForgetPasswordMessage] = useState("");

  const navigate = useNavigate();

  const validationschema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z].{5,}/,
        "Password must start with a capital letter and be at least 6 characters long"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: validationschema,
  });

  async function handleLogin(values) {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message == "success") {
        navigate("/");
        setToken(data.token);
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function HandleForgetPassword(email) {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          email: email,
        },
        {}
      );
      setShowForget(true);
      setForgetPasswordMessage(response.data);
    } catch (error) {
      setforgetPErrorMsg(error.response?.data?.message);
    }
  }

  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required").email("Invalid email"),
    }),
    onSubmit: (values) => {
      HandleForgetPassword(values.email); // Call the forgot password function
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="my-7 text-green-600">Login Form</h2>

        {errorMsg ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
            role="alert"
          >
            {errorMsg}
          </div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group">
          <input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
            role="alert"
          >
            {formik.errors.email}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>

        {formik.errors.password && formik.touched.password && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
            role="alert"
          >
            {formik.errors.password}
          </div>
        )}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <button
          type="button"
          onClick={() => setShowForget(true)}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ms-5"
        >
          Forget Password ?
        </button>
      </form>

      {showForget && (
        <>
          <div
            onClick={() => setShowForget(false)}
            className="fixed inset-0 bg-black/40 flex justify-center items-center"
          ></div>
          <div className="bg-white rounded-lg px-4 flex flex-col items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <form onSubmit={forgotPasswordFormik.handleSubmit}>
              <h2 className="my-7 text-green-600">Forgot Password</h2>

              {forgetPErrorMsg ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                  role="alert"
                >
                  {forgetPErrorMsg}
                </div>
              ) : null}

              <div className="relative z-0 w-full mb-5 group">
                <input
                  name="email"
                  onChange={forgotPasswordFormik.handleChange}
                  onBlur={forgotPasswordFormik.handleBlur}
                  value={forgotPasswordFormik.values.email}
                  type="email"
                  id="forgotEmail"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="forgotEmail"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>

              {forgotPasswordFormik.errors.email &&
                forgotPasswordFormik.touched.email && (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                    role="alert"
                  >
                    {forgotPasswordFormik.errors.email}
                  </div>
                )}

              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 mb-6 text-center "
              >
                Submit
              </button>

              <button
                onClick={() => setShowForget(false)}
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 mb-6 ms-3 text-center "
              >
                Cancel
              </button>
              {forgetPasswordMessage && (
                <div
                  className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 "
                  role="alert"
                >
                  {forgetPasswordMessage}
                </div>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
}
