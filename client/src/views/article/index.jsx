import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/api";
export default function ArticleView() {
  const { articleId } = useParams();
  const [article, setArticle] = useState([]);
  const FetchArticleById = async () => {
    try {
      const response = await axios.get(API_URL + `api/articles/${articleId}`);

      setArticle(response.data);
    } catch (error) {
      console.error("Error fetching article data:", error);
    }
  };
  useEffect(() => {
    FetchArticleById();
  }, [articleId]);

  const coverUrl = API_URL + `uploads/article-cover/${article.cover}`;
  const avatarUrl = API_URL + `uploads/avatar/${article.avatar}`;

  return (
    <div className="px-4 mt-4 lg:px-60">
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt="avatar"
          className="h-10 w-10 object-cover lg:h-14 lg:w-14 rounded-full border"
        />
        <div>
          <h1 className="lg:text-xl">{article.author}</h1>
          <p className="text-xs lg:text-sm text-gray-400">
            Last updated on{" "}
            {new Date(article.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <span className="rounded-lg border border-black py-1 px-3 text-sm">
          {article.category}
        </span>
        <h1 className="text-3xl font-semibold"> {article.title}</h1>
        <img src={coverUrl} alt="article-img" className=" w-full" />
        <p
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></p>
      </div>
    </div>
  );
}
