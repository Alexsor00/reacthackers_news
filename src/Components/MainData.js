import { useEffect, useState } from "react";
import { getArticles } from "../services/articles.service";
import { getUser } from "../services/user.service";
import Entry from "./Entry";
import "./MainData.css";
export default function MainData() {
  const [articles, setArticles] = useState(null);
  console.log(articles);
  useEffect(() => {
    const getDBArticles = async () => {
      const data = await getArticles();
      setArticles(data);
      
    };
    getDBArticles();
  }, []);

  return (
    <table className="mainTable">
      <tbody>
        {articles !== null &&
          articles.map((article, index) => {
            return <Entry article={article} index={index}/>;
          })}
      </tbody>
    </table>
  );
}
