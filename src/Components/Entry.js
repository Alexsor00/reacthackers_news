import { useEffect, useState } from "react";
import { getUser } from "../services/user.service";
import "./Entry.css";
import moment from "moment";
import { unvote, upvoteArticleDB } from "../controllers/article.controller";
import { getArticle } from "../services/articles.service";
import { getCommentsArticle } from "../services/comments.service";
import { isUpvotedArticle } from "../services/upvotes.services";

export default function Entry({ article, index, currentUser }) {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState(null);
  const [upvoted, setUpvoted] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(article);
  const [articlePoints, setArticlePoints] = useState(null);

   /**
     * Gets the necessary data for Initialization.
     * @return [returns nothing]
     */ 
  useEffect(() => {
    const getAllData = async () => {
      const articleDB = await getArticle(article.id);
      setCurrentArticle(articleDB);
      setArticlePoints(articleDB.points);
      const commentsArticleDB = await getCommentsArticle(article.id);
      setComments(commentsArticleDB);
      const user = await getUser(article.autor_email);
      setUser(user);
      const upvoteDB = await isUpvotedArticle(currentUser.email, article.id);
      setUpvoted(upvoteDB);
    };
    getAllData();
  }, []);


    /**
   * Creates an entry on the DB "updates_articles" collection, updates the article with the new score and updates the state of setArticlePoints and upvoted
   * @return [returns nothing]
   */
  const upvoteArticle = async () => {
    await upvoteArticleDB(
      article.id,
      articlePoints,
      currentUser.email
    );

    const upvoteDB = await isUpvotedArticle(currentUser.email, article.id);
    setUpvoted(upvoteDB);
    setArticlePoints(articlePoints + 1);
  };


  /**
   * Deletes the entry on the DB "updates_articles" collection for the ID of the article, updates the article with the new score and updates the state of setArticlePoints and upvoted
   * @return [returns nothing]
   */
  const unvoteArticle = async () => {
    await unvote(upvoted.id, article.id, articlePoints);
    const upvoteDB = await isUpvotedArticle(currentUser.email, article.id);
    setUpvoted(upvoteDB);
    setArticlePoints(articlePoints - 1);
  };

  return (
    <>
      {user && (
        <>
          {" "}
          <tr className="separator">
            <td></td>
          </tr>
          <tr>
            <td align="right" valign="top" className="title">
              <span className="index">{index + 1}.</span>
            </td>
            <td valign="top" className="votelinks">
              <center>
                {upvoted && !upvoted.isvoted && (
                  <a href="javascript:void(0)" onClick={upvoteArticle}>
                    <div className="arrow_upvote" title="upvote"></div>
                  </a>
                )}
              </center>
            </td>
            {currentArticle.url === undefined ? (
              <td className="title">
                <a href={`/article/${currentArticle.id}`}>
                  {currentArticle.title}
                </a>{" "}
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
              <span>{articlePoints} points</span> by
              {user !== null &&
              currentUser !== null &&
              user.nickname === currentUser.nickname ? (
                <a className="user" href={`/user/${user.email}`}>
                  {" "}
                  {user.nickname}
                </a>
              ) : (
                <a href={`/user/${user.email}`}> {user.nickname}</a>
              )}
              <a>
                {" "}
                {moment(
                  new Date(currentArticle.created_at.seconds * 1000)
                ).fromNow()}
              </a>{" "}
              {upvoted && upvoted.isvoted && (
                <span>
                  {" "}
                  <a href="javascript:void(0)" onClick={unvoteArticle}>
                    | unvote{" "}
                  </a>
                </span>
              )}
              | hide |
              <a href={`/article/${currentArticle.id}`}>
                {" "}
                {comments ? comments.length : 0} comments
              </a>
            </td>
          </tr>{" "}
        </>
      )}
    </>
  );
}
