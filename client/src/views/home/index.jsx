import { useState, useEffect } from "react";
import ArticleCard from "../../components/ArticleCard";
import HeroArticle from "../../components/HeroArticle";
import axios from "axios";
import { API_URL } from "../../services/api";

export default function HomeView() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchMyArticles = async () => {
    try {
      // Make a GET request to fetch all articles
      const response = await axios.get(API_URL + "api/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchMyArticles();
  }, []);

  const sortedArticles = articles.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentArticles = sortedArticles.slice(startIndex, endIndex);

  const totalPages = Math.ceil(articles.length / itemsPerPage);

  return (
    <div>
      <HeroArticle />
      <div className="px-10 lg:px-28">
        {/* Article Card */}
        <div className="mt-10 grid grid-cols-12 gap-6">
          {currentArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
          <div className="col-span-12">
            <div className="mt-10 flex justify-center">
              <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm gap-5">
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center px-3 h-8 leading-tight hover:bg-gray-100 rounded-md hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handlePageChange(index + 1)}
                        className={`flex items-center justify-center px-3 h-8 ${
                          currentPage === index + 1
                            ? "text-white bg-black"
                            : "text-gray-500 hover:bg-gray-100 rounded-md hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        }`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center justify-center px-3 h-8 leading-tight hover:bg-gray-100 rounded-md hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
