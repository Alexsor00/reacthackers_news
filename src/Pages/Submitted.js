import { useEffect, useState } from "react";
import { getArticles, getArticles_byUser } from "../services/articles.service";
import { getUser } from "../services/user.service";
import { useParams } from "react-router-dom";

import Entry from "../Components/Entry";
import moment from "moment";
export default function Submitted() {
  const { user_email } = useParams();

  const [articles, setArticles] = useState(null);
  console.log(articles);
  useEffect(() => {
    const getDBArticles = async () => {
      const data = await getArticles_byUser(user_email);
      setArticles(data);
    };
    getDBArticles();
  }, []);
  return (
    <table className="mainTable">
      <tbody>
        {articles !== null &&
          articles.map((article) => {
            return <Entry article={article} />;
          })}
      </tbody>
    </table>
  );
}
