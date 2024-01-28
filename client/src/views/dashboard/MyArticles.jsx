/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../services/api";

export default function MyArticlesView() {
  const navigate = useNavigate();
  const [myArticles, setMyArticles] = useState([]);

  const fetchMyArticles = async () => {
    try {
      // Retrieve user email from localStorage
      const author = JSON.parse(localStorage.getItem("user")).email;

      // Make a GET request to fetch all articles
      const response = await axios.get(API_URL + "api/articlesUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      });

      if (response.status === 200) {
        // Filter articles based on the author's email
        const filteredArticles = response.data.filter(
          (article) => article.authorEmail === author
        );

        setMyArticles(filteredArticles);
      } else {
        // Handle errors or display an error message
        console.error("Failed to fetch articles.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        // Make a DELETE request to delete the article
        const response = await axios.delete(
          API_URL + `api/articlesUser/${articleId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: JSON.parse(localStorage.getItem("token")),
            },
          }
        );

        if (response.status === 200) {
          // Article deleted successfully, show success message and refresh the page
          Swal.fire({
            text: "Your Article has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // Refresh the page or perform any other necessary actions
            fetchMyArticles();
          });
        } else {
          // Handle errors or display an error message
          console.error("Failed to delete article. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting article:", error);
        // Handle errors or display an error message
      }
    }
  };

  useEffect(() => {
    fetchMyArticles();
  }, []);

  return (
    <>
      <div className="mb-8 text-black py-5 bg-black rounded-t-lg shadow-lg">
        <h1 className="text-center text-white text-xl font-semibold">
          My Articles
        </h1>
      </div>
      {myArticles.length > 0 ? (
        <div className="mb-4 px-5">
          <Link
            to={"/dashboard/newArticle"}
            className="font-bold bg-black text-white px-6 py-2 rounded-sm"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      ) : (
        ""
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5 pb-8">
        <table className=" w-full text-sm text-center rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" py-3">
                No.
              </th>
              <th scope="col" className=" py-3">
                Title
              </th>
              <th scope="col" className=" py-3">
                Category
              </th>
              <th scope="col" className=" py-3">
                Cover Image
              </th>
              <th scope="col" className=" py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {myArticles.length > 0 ? (
              myArticles.map((article, index) => {
                return (
                  <>
                    <tr
                      key={article._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="py-4">{article.title}</td>
                      <td className="py-4">{article.category}</td>
                      <td className="py-4 flex justify-center items-center">
                        <img
                          src={
                            API_URL + `uploads/article-cover/${article.cover}`
                          }
                          alt="cover"
                          className="w-32 h-20 rounded-lg object-cover"
                        />
                      </td>
                      <td className="space-x-2 px-6 py-4">
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/myArticles/${article._id}/edit`
                            )
                          }
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article._id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <div className="col-span-12 bg-slate-100 h-full w-full text-center p-2 rounded-lg">
                <div className="py-5">
                  <h1 className="text-xl mb-5">No articles found</h1>
                  <button
                    className="py-3 w-[25%] bg-black text-white font-semibold rounded-xl"
                    onClick={() => navigate("/dashboard/newArticle")}
                  >
                    Create Here
                  </button>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
