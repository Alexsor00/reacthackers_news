import { useEffect, useState } from "react";
import { getArticles, get_OrderedArticles } from "../services/articles.service";
import { getUser } from "../services/user.service";
import Entry from "../Components/Entry";
export default function MainData() {
  const [articles, setArticles] = useState(null);
  console.log(articles);
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
            return <Entry article={article} index={index} />;
          })}
      </tbody>
    </table>
  );
}
