import { useEffect, useState } from "react";
import { getArticles_byUser } from "../services/articles.service";
import { useParams } from "react-router-dom";

import Entry from "../Components/Entry";
export default function Submitted() {
  const { user_email } = useParams();

  const [articles, setArticles] = useState(null);
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
          articles.map((article, index) => {  
            return <Entry article={article} index={index} currentUser={user_email} />;
          })}
      </tbody>
    </table>
  );
}
