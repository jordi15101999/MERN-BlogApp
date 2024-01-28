/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "../../../services/api";

export default function LoginView() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL + "api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const { token, user } = await response.json();

        // Store user session in localStorage or state
        localStorage.setItem("user", JSON.stringify(user));

        // Store token in localStorage or wherever you manage tokens
        localStorage.setItem("token", JSON.stringify(token));

        // Swal.fire({
        //   text: "Login Success !",
        //   icon: "success",
        // });
        Swal.fire({
          icon: "success",
          text: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      } else {
        // Handle login error
        const data = await response.json();
        Swal.fire({
          icon: "error",
          text: data.error,
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen px-8 lg:p-0">
        <div className="flex flex-col h-96 w-96 border border-black rounded-lg bg-slate-900 shadow-lg">
          <div className="py-4">
            <h1 className="text-white text-center text-3xl">Login</h1>
          </div>
          <div className="p-6">
            <form className="max-w-md mx-auto" onSubmit={handleLogin}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="password"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <button
                  type="submit"
                  className=" text-black bg-white w-full hover:bg-black hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
                <p className="text-white">
                  Don't have an account? register{" "}
                  <Link className="underline" to={"/register"}>
                    here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
