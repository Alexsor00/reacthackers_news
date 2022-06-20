import { useEffect, useState } from "react";
import { getUser } from "../services/user.service";
import "./Entry.css";
import moment from "moment";
import { upvote } from "../controllers/article.controller";
import { getArticle } from "../services/articles.service";

export default function Entry({ article }) {
  const [user, setUser] = useState(null);

  const [currentPoints, setCurrentPoints] = useState(article.points);
  useEffect(() => {
    const getUserDB = async () => {
      const user = await getUser(article.autor_email);
      setUser(user);
    };

    getUserDB();
  }, []);

  const handleClick = async () => {
    await upvote(article.id, currentPoints);
    setCurrentPoints(currentPoints + 1);
  };

  return (
    <>
      <tr>
        <td align="right" valign="top" className="title">
          <span>1</span>
        </td>
        <td valign="top" className="votelinks">
          <center>
            <a onClick={handleClick}>
              <div className="arrow" title="upvote"></div>
            </a>
          </center>
        </td>
        <td className="title">
          <a href={article.url}>{article.title}</a>{" "}
          <span style={{ fontSize: "10.33px", color: "#828282" }}>
            ({article.url})
          </span>
        </td>
      </tr>
      <tr>
        <td colSpan={2}></td>
        <td className="subtext">
          <span>{currentPoints} points</span> by
          {user !== null && <a href={`user/${user.email}`}> {user.nickname}</a>}
          <a>
            {" "}
            {moment(new Date(article.created_at.seconds * 1000)).fromNow()}
          </a>{" "}
          | hide |<a> 171 Comments</a>
        </td>
      </tr>
    </>
  );
}
