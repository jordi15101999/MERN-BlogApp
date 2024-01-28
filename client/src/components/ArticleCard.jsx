/* eslint-disable react/prop-types */
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { API_URL } from "../services/api";
export default function ArticleCard({ article }) {
  const limitHtml = (html, maxLength) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    let textContent = doc.body.textContent || "";
    const truncatedContent = textContent.slice(0, maxLength);
    return textContent.length > maxLength
      ? truncatedContent + " . . . "
      : truncatedContent;
  };

  const coverUrl = API_URL + `uploads/article-cover/${article.cover}`;

  return (
    <>
      <div className="col-span-12 lg:col-span-4 md:col-span-6 h-full w-full">
        <div className="flex flex-col gap-4">
          <img
            src={coverUrl}
            alt=""
            className="h-[210px] w-full object-cover rounded-lg shadow-lg"
          />
          <p className="text-gray-500 text-sm">
            {article.author} .{" "}
            {new Date(article.updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex justify-between items-center">
            <Link
              to={`/article/${article._id}`}
              className="flex justify-between items-center hover:underline"
            >
              <h1 className="font-semibold text-2xl">{article.title}</h1>
              <ArrowUpRight size={24} />
            </Link>
          </div>
          {/* {article.content.slice(0, 120)}
          {article.content.length > 120 ? "..." : ""} */}
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{
              __html: limitHtml(article.content, 150),
            }}
          ></p>
          <ul className="flex gap-2">
            <li className="rounded-full border border-black py-1 px-3 text-sm font-semibold">
              {article.category}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
