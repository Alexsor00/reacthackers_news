import { useEffect, useState } from "react";
import { getUser } from "../services/user.service";
import "./Entry.css";
import moment from "moment";
import { upvote } from "../controllers/article.controller";
import { getArticle } from "../services/articles.service";

export default function Entry({ article, index }) {
  const [user, setUser] = useState(null);

  const [currentArticle, setCurrentArticle] = useState(article);
  useEffect(() => {
    const getUserDB = async () => {
      const user = await getUser(article.autor_email);
      setUser(user);
    };

    getUserDB();
  }, []);

  useEffect(() => {
    
    const getArticleDB = async () => {
   
      const articleDB = await getArticle(article.id);
      setCurrentArticle(articleDB);
    console.log(currentArticle)

    
    };

    getArticleDB();
  }, []);

 

  const handleClick = async () => {
    await upvote(article.id, currentArticle.points);
    const articleDB = await getArticle(article.id);
    setCurrentArticle(articleDB);
  

  };

  return (
    <>
          <tr className="separator"><td></td></tr>

      <tr>
        <td align="right" valign="top" className="title">
          <span className="index">{index + 1}.</span>
        </td>
        <td valign="top" className="votelinks">
          <center>
            <a onClick={handleClick}>
              <div className="arrow" title="upvote"></div>
            </a>
          </center>
        </td>
        <td className="title">
          <a href={currentArticle.url}>{currentArticle.title}</a>{" "}
          <span style={{ fontSize: "10.33px", color: "#828282" }}>
            ({currentArticle.url})
          </span>
        </td>
      </tr>
      <tr>
        <td colSpan={2}></td>
        <td className="subtext">
          <span>{currentArticle.points} points</span> by
          {user !== null && <a href={`user/${user.email}`}> {user.nickname}</a>}
          <a>
            {" "}
            {moment(new Date(currentArticle.created_at.seconds * 1000)).fromNow()}
          </a>{" "}
          | hide |<a> 171 Comments</a>
        </td>
      </tr>

    </>
  );
}
