import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { FaUser } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { register } from "../store/reducers/authSlice";
import {
  successNotification,
  errorNotification,
} from "../helpers/notification";
import { Spin } from "antd";

let validationSchema = Yup.object({
  name: Yup.string().required("*name field is required"),
  email: Yup.string().required("*email field is required"),
  password: Yup.string().required("*password field is required"),
});

type FormValues = Yup.InferType<typeof validationSchema>;

const Register: React.FC = () => {
  const initialValues: FormValues = { name: "", email: "", password: "" };
  let loading = useAppSelector(state=>state.auth.loading)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data: FormValues, { resetForm }: any) => {
    dispatch(register(data))
      .unwrap()
      .then(() => {
        successNotification("bottomRight", "successfully registered");
        resetForm({});
        return navigate("/");
      })
      .catch((err) => {
        errorNotification(
          "bottomRight",
          err?.response?.data?.error || "internal error"
        );
      });
  };

  return (
    <>
      <div className="top-40 relative">
        <div className="container max-w-screen-sm center mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched }: any) => (
              <Spin spinning={loading}>
              <Form className="bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl mb-4 text-center flex w-100  items-center justify-center">
                  <FaUser /> <span className="ml-4">Register now</span>
                </h1>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Full name
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.name && errors.name && "border-red-700"
                    }`}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full name"
                  />

                  {touched.name && errors.name && (
                    <p className="text-red-500 mt-2 text-xs italic">
                      {errors.name}.
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.email && errors.email && "border-red-700"
                    }`}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 mt-2 text-xs italic">
                      {errors.email}.
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Field
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      touched.password && errors.password && "border-red-700"
                    }`}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******************"
                  />
                  {touched.password && errors.password && (
                    <p className="text-red-500 mt-2 text-xs italic">
                      {errors.password}.
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register
                  </button>
                  <Link
                    className="inline-block align-baseline font-bold text-sm text-gray-300 hover:text-white"
                    to="/login"
                  >
                    Already have an Account?
                  </Link>
                </div>
              </Form>
              </Spin>
            )}
          </Formik>
          <p className="text-center text-gray-500 text-xs">
            &copy;2022 Nodirbek Intern. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
