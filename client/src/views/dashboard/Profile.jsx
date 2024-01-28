import { useState, useRef } from "react";
import { API_URL } from "../../services/api";
import axios from "axios";
import { UploadCloud } from "lucide-react";

export default function ProfileView() {
  const [editFullNameMode, setEditFullNameMode] = useState(false);
  const [editAvatarMode, setEditAvatarMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const fileInputRef = useRef(null);

  // Ensure user is initialized properly
  const user = JSON.parse(localStorage.getItem("user")) || {
    fullName: "",
    email: "",
    avatar: "",
    createdAt: "",
  };

  const avatarUrl = API_URL + `uploads/avatar/${user.avatar}`;

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEditFullNameClick = () => {
    setEditFullNameMode(true);
  };

  const handleSaveFullNameClick = async () => {
    try {
      const response = await axios.patch(
        `${API_URL}api/update-profile/${user._id}`,
        { fullName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data.updatedUser));

      setEditFullNameMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleSaveAvatarClick = async () => {
  //   try {
  //     const avatarFormData = new FormData();
  //     avatarFormData.append("avatar", fileInputRef.current.files[0]);

  //     const avatarResponse = await axios.patch(
  //       `${API_URL}api/update-profile/${user._id}`,
  //       avatarFormData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: JSON.parse(localStorage.getItem("token")),
  //         },
  //       }
  //     );

  //     const updatedAvatar = avatarResponse.data.updatedAvatar;

  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify({ ...user, avatar: updatedAvatar })
  //     );

  //     fileInputRef.current.value = "";

  //     setEditAvatarMode(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleSaveAvatarClick = async () => {
    try {
      const avatarFormData = new FormData();
      avatarFormData.append("avatar", fileInputRef.current.files[0]);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      };

      // Use axios.post instead of axios.patch for uploading files
      const avatarResponse = await axios.patch(
        `${API_URL}api/update-profile/${user._id}`,
        avatarFormData,
        config
      );

      // Assuming the backend returns the updated user data including the new avatar
      const updatedUser = avatarResponse.data.updatedUser;

      // Update user data in local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      fileInputRef.current.value = "";

      setEditAvatarMode(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="mb-8 text-black py-5 bg-black rounded-t-lg shadow-lg">
        <h1 className="text-center text-white text-xl font-semibold">
          My Profile
        </h1>
      </div>
      <div className="px-5 pb-5">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 bg-slate-100 h-full w-full text-center p-2 rounded-lg">
            <div className="relative flex flex-col justify-center items-center gap-5 py-5  overflow-x-auto sm:rounded-lg">
              <div>
                <img
                  src={avatarUrl}
                  alt="user image"
                  className="rounded-full border border-slate-900 w-32 h-32 object-cover"
                />
              </div>
              <div>
                <label
                  htmlFor="avatar"
                  className="text-sm font-medium text-gray-900 flex items-center justify-center"
                >
                  <UploadCloud size={24} color="#000" />
                  <span className="ml-2">Change Avatar</span>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={() => setEditAvatarMode(true)}
                  />
                </label>
                {editAvatarMode && (
                  <button
                    onClick={handleSaveAvatarClick}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline py-2 px-4 "
                  >
                    Save Avatar
                  </button>
                )}
              </div>
              <table className="w-[40%] shadow-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Full Name
                    </th>
                    {editFullNameMode ? (
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <input
                          type="text"
                          value={fullName}
                          onChange={handleFullNameChange}
                          className="border border-black rounded-md p-2"
                        />
                      </td>
                    ) : (
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {user.fullName}
                      </td>
                    )}
                    <td className="px-6 py-4 text-right">
                      {editFullNameMode ? (
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={handleSaveFullNameClick}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={handleEditFullNameClick}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Email
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-right"></td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Join Date
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
