import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login successfully");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page ">
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <Form
            layout="vertical"
            onFinish={submitHandler}
            className="mt-6 flex w-[25%] h-[49%] flex-col gap-y-2 bg-richblack-600 px-8 py-4 rounded-2xl"
          >
            <h1 className="text-white text-3xl mb-1">Login Form</h1>
            <Form.Item label="Email" name="email" className="relative">
              <Input
                type="email"
                required
                placeholder="Enter email address"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-300 p-[12px] pr-12 text-white"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className="relative -mt-3"
            >
              <Input
                required
                type="password"
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-300 p-[12px] pr-12 text-white"
              ></Input>
            </Form.Item>
            <div className="flex gap-5 justify-between -mt-3">
              <Link to="/register">Not a user ? Click Here to register</Link>
              <button className="rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                Login
              </button>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default Login;
