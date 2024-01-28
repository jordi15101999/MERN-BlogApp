import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditor from "froala-editor";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../services/api";
export default function NewArticleView() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Technology");
  const [cover, setCover] = useState(null); // Added state for cover image
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve user email from localStorage
    const author = JSON.parse(localStorage.getItem("user"));

    const articleData = new FormData();
    articleData.append("title", title);
    articleData.append("content", content);
    articleData.append("category", selectedCategory);
    articleData.append("cover", cover); // Append the cover image to the FormData
    articleData.append("authorEmail", author.email);
    articleData.append("authorFullName", author.fullName);

    try {
      // Make a POST request to create a new article
      const response = await axios.post(
        API_URL + "api/articlesUser",
        articleData,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
            // Include any additional headers or authentication tokens as needed
          },
        }
      );

      if (response.status === 200) {
        // Article created successfully, navigate to the dashboard or wherever you prefer
        Swal.fire({
          icon: "success",
          text: "Article Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myArticles");
      } else {
        // Handle errors or display an error message
        Swal.fire({
          icon: "error",
          text: "Failed to create article. Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
        setError("Failed to create article. Please try again.");
      }
    } catch (error) {
      console.error("Error creating article:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      {" "}
      <div className="mb-8 text-black py-5 bg-black rounded-t-lg shadow-lg">
        <h1 className="text-center text-white text-xl font-semibold">
          Create New Article
        </h1>
      </div>
      <div className="px-20 py-10">
        {" "}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="content"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Content
            </label>
            <FroalaEditorComponent
              tag="textarea" // Make sure to include this tag prop
              model={content}
              onModelChange={(value) => setContent(value)}
              config={{
                // FroalaEditor config options
                paragraphFormat: {
                  N: "Normal",
                  H1: "Heading 1",
                  H2: "Heading 2",
                  H3: "Heading 3",
                  H4: "Heading 4",
                  H5: "Heading 5",
                  H6: "Heading 6",
                  pre: "Pre",
                },
                enter: FroalaEditor.ENTER_BR,
              }}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="Technology">Technology</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Games">Games</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="md-5">
            <label
              htmlFor="cover"
              className="peer-focus:font-medium text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Article Cover Image
            </label>
            <input
              type="file"
              name="cover"
              id="cover"
              accept="image/*"
              onChange={handleCoverChange}
              className=" block py-2.5 px-0 lg:w-[20%] text-sm border-0 appearance-none focus:outline-none focus:ring-0"
            />
          </div>
          <div className="flex justify-center items-center mt-4">
            <button
              type="submit"
              className="bg-black text-white py-3 w-[25%] rounded-xl shadow-lg"
            >
              Submit
            </button>
          </div>
          {error && (
            <p
              style={{
                color: "red",
              }}
            >
              {error}
            </p>
          )}
        </form>{" "}
      </div>
    </>
  );
}
