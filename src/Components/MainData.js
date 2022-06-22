import { useEffect, useState } from "react";
import { getArticles } from "../services/articles.service";
import Entry from "./Entry";
import "./MainData.css";
export default function MainData({ currentUser }) {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const getDBArticles = async () => {
      const data = await getArticles();
      setArticles(data);
    };
    getDBArticles();
  }, []);

  return (
    <>
      <table className="mainTable">
        <tbody>
          {articles !== null &&
            articles.map((article, index) => {
              return (
                <Entry
                  article={article}
                  index={index}
                  currentUser={currentUser}
                  key={index}
                />
              );
            })}
        </tbody>
      </table>
    </>
  );
}
