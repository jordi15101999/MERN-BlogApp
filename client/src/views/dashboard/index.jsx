/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../services/api";
export default function DashboardView() {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [articleCount, setArticleCount] = useState(0);

  const fetchData = async () => {
    try {
      const userResponse = await axios.get(API_URL + "api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      const articleResponse = await axios.get(API_URL + "api/articlesUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      });

      if (userResponse.status === 200 && articleResponse.status === 200) {
        setUserCount(userResponse.data.length);
        setArticleCount(articleResponse.data.length);
      } else {
        console.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    // Format the date in "DD Mon YYYY" format
    const formattedDateStr = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setFormattedDate(formattedDateStr);
  }, [date]);

  function tick() {
    setDate(new Date());
  }

  return (
    <>
      <div className="dashboard-welcome rounded-lg grid-cols-12 space-y-4 lg:flex lg:justify-center lg:items-center lg:gap-10 lg:p-32 ">
        <div className="col-span-12 lg:col-span-4 bg-white border shadow-lg rounded-lg h-[150px] w-[150px] flex justify-center items-center">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-3xl font-bold">{userCount}</h1>
            <p className="text-md font-semibold">Users</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-white border shadow-lg rounded-lg h-[150px] w-[150px] flex justify-center items-center">
          <div className="flex flex-col items-center justify-center ">
            <p className="text-xl font-semibold">{formattedDate}</p>
            <p className="text-md ">{date.toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-white border shadow-lg rounded-lg h-[150px] w-[150px] flex justify-center items-center">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-3xl font-bold">{articleCount}</h1>
            <p className="text-md font-semibold">Articles</p>
          </div>
        </div>
      </div>
    </>
  );
}
