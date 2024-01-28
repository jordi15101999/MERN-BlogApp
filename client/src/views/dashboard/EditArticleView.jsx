/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FroalaEditorComponent from "react-froala-wysiwyg";
import FroalaEditor from "froala-editor";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../services/api";
export default function EditArticleView() {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [loading, setLoading] = useState(true);
  const [articleData, setArticleData] = useState({
    title: "", // initialize with an empty string or fetch the initial value
    content: "", // fetch the initial value from your data source
    category: "",
    cover: "", // initialize with an empty string or fetch the initial value
  });
  const [newCover, setNewCover] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fetchArticleData = async () => {
    try {
      const response = await axios.get(
        API_URL + `api/articlesUser/${articleId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      );

      if (response.status === 200) {
        setArticleData(response.data);
        setLoading(false);
      } else {
        console.error("Failed to fetch article data.");
      }
    } catch (error) {
      console.error("Error fetching article data:", error);
    }
  };
  useEffect(() => {
    fetchArticleData();
  }, [articleId]);

  if (loading) {
    return <p className="px-10 py-5">Loading...</p>; // You can display a loading spinner or message
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have an API endpoint at localhost:3001/api/articles/:articleId for updating articles
    const apiUrl = API_URL + `api/articlesUser/${articleId}`;

    const updatedArticleData = new FormData();
    updatedArticleData.append("title", articleData.title);
    updatedArticleData.append("content", articleData.content);
    updatedArticleData.append("category", articleData.category);
    if (newCover) {
      updatedArticleData.append("cover", newCover);
    }

    try {
      // Make a PUT request to update the article
      const response = await axios.put(apiUrl, updatedArticleData, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
          // Include any additional headers or authentication tokens as needed
        },
      });

      if (response.status === 200) {
        // Article updated successfully, navigate to the dashboard or wherever you prefer
        Swal.fire({
          icon: "success",
          text: "Article Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/dashboard/myArticles`);
      } else {
        // Handle errors or display an error message
        Swal.fire({
          icon: "error",
          text: "Failed to update article. Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Failed to update article. Please try again.");
      }
    } catch (error) {
      console.error("Error updating article:", error);
      // Handle errors or display an error message
    }
  };

  return (
    <>
      <div className="px-20 py-10">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={articleData.title}
              onChange={handleChange}
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
              tag="textarea"
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
              model={articleData.content} // Pass the article content to the FroalaEditorComponent
              onModelChange={(newContent) =>
                setArticleData((prevData) => ({
                  ...prevData,
                  content: newContent,
                }))
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={articleData.category}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            >
              <option value="Technology">Technology</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Games">Games</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="newCover"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Article Cover Image
            </label>
            <input
              type="file"
              name="newCover"
              id="newCover"
              accept="image/*"
              onChange={(e) => setNewCover(e.target.files[0])}
              className="block py-2.5 px-0 lg:w-[20%] text-sm border-0 appearance-none focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-black text-white p-3 lg:w-[25%] rounded-xl shadow-lg"
            >
              Update Article
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
