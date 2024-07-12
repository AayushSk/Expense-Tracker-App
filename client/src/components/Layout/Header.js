import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { FaRegUser } from "react-icons/fa6";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout successfully");
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="flex h-16 items-center justify-between border-b-[1px] border-b-richblack-900 bg-richblack-700 transition-all duration-200">
          <Link className="text-white ml-6" to="/">
            <h1>EXPENSE MANAGEMENT APP</h1>
          </Link>
          <ul className="flex gap-x-8 text-richblack-25 mr-10 text-balance">
            <li className="flex gap-2 items-center">
              <FaRegUser />{" "}
              <p className=" font-bold text-lg uppercase">
                {loginUser && loginUser.name}
              </p>
            </li>
            <li>
              <button
                className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px]
                        text-richblack-100 rounded-md hover:bg-richblack-900 transition-all duration-200"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
