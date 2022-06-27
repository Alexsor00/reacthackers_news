import { useEffect, useState } from "react";
import { get_OrderedArticles } from "../services/articles.service";
import Entry from "../Components/Entry";
export default function MainData({ currentUser }) {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    const getDBArticles = async () => {
      const data = await get_OrderedArticles();
      setArticles(data);
    };
    getDBArticles();
  }, []);
  return (
    <table className="mainTable">
      <tbody>
        {articles !== null &&
          articles.map((article, index) => {
            return (
              <Entry
                article={article}
                index={index}
                currentUser={currentUser}
              />
            );
          })}
      </tbody>
    </table>
  );
}
