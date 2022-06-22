import { useEffect, useState } from "react";
import { getUser } from "../services/user.service";
import "./Entry.css";
import moment from "moment";
import { upvote } from "../controllers/article.controller";
import { getArticle } from "../services/articles.service";
import { getCommentsArticle } from "../services/comments.service";

export default function Entry({ article, index }) {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null) 

  const [currentArticle, setCurrentArticle] = useState(article);

  useEffect(() => {
    const getAllData = async () => {
      const articleDB = await getArticle(article.id);
      setCurrentArticle(articleDB);
      const commentsArticleDB = await getCommentsArticle(article.id);
      setComments(commentsArticleDB)
      const user = await getUser(article.autor_email);
      setUser(user);
        };

    getAllData();
  }, []);

  const handleClick = async () => {
    await upvote(article.id, currentArticle.points);
    const articleDB = await getArticle(article.id);
    setCurrentArticle(articleDB);
  };

  return (
    <>
      <tr className="separator">
        <td></td>
      </tr>

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
        {currentArticle.url === undefined ? (
          <td className="title">
            <a href={`/article/${currentArticle.id}`}>{currentArticle.title}</a>{" "}
          </td>
        ) : (
          <td className="title">
            <a href={currentArticle.url}>{currentArticle.title}</a>{" "}
            <span style={{ fontSize: "10.33px", color: "#828282" }}>
              ({currentArticle.url})
            </span>
          </td>
        )}
      </tr>
      <tr>
        <td colSpan={2}></td>
        <td className="subtext">
          <span>{currentArticle.points} points</span> by
          {user !== null && <a href={`/user/${user.email}`}> {user.nickname}</a>}
          <a>
            {" "}
            {moment(
              new Date(currentArticle.created_at.seconds * 1000)
            ).fromNow()}
          </a>{" "}
          | hide |<a> {comments ? comments.length : 0} comments</a>
        </td>
      </tr>
    </>
  );
}
