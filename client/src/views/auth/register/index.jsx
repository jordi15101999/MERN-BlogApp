import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../../../services/api";
export default function RegisterView() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      // Handle file input separately
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Send registration data to the server
    // On success, redirect to the login page
    try {
      const formDataWithFile = new FormData();
      formDataWithFile.append("fullName", formData.fullName);
      formDataWithFile.append("email", formData.email);
      formDataWithFile.append("password", formData.password);
      formDataWithFile.append("avatar", formData.avatar);

      const response = await axios.post(
        API_URL + "api/register",
        formDataWithFile
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          text: "Registration Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login"); // Redirect to login page on success
      } else {
        // Handle registration error
        Swal.fire({
          icon: "error",
          text: "Email already exists!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen px-8 lg:p-0">
        <div className="flex flex-col h-110 w-96 border border-black rounded-lg bg-slate-900 shadow-lg">
          <div className="py-4">
            <h1 className="text-white text-center text-3xl">Register</h1>
          </div>
          <div className="p-6">
            <form className="max-w-md mx-auto" encType="multipart/form-data">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="fullname"
                  className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Full Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-white peer"
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                />
                <label
                  htmlFor="avatar"
                  className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Avatar
                </label>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className=" text-black bg-white w-full hover:bg-black hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
                <p className="text-white">
                  Already have an account? login{" "}
                  <Link className="underline" to={"/login"}>
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
