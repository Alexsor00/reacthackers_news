import { useEffect, useState } from "react";
import { getUser } from "../services/user.service";
import "./Comment.css";
import moment from "moment";
import { getReplyComments } from "../services/comments.service";
import { getArticle } from "../services/articles.service";
import { useLocation } from "react-router-dom";
import { isUpvotedComment } from "../services/upvotes.services";
import {
  unvoteCommentDB,
  upvoteCommentDB,
} from "../controllers/comments.controller";

export default function Comment({ comment, currentUser, index }) {
  const [userComment, setUserComment] = useState(null);
  const [upvoted, setUpvoted] = useState(null);

  const [replies, setReplies] = useState(null);
  const [article, setArticle] = useState(null);
  const [commentsPoints, setCommentsPoints] = useState(null);

  //Gets the URL
  const location = useLocation();

  useEffect(() => {
    /**
     * Gets the necessary data for Initialization.
     * @return [returns nothing]
     */
    const getUserDB = async () => {
      const user = await getUser(comment.user_id);
      setUserComment(user);
      const dataReplies = await getReplyComments(comment.id);
      setReplies(dataReplies);
      const articleDB = await getArticle(comment.article_id);
      setArticle(articleDB);
      setCommentsPoints(comment.points);
      const upvoteDB = await isUpvotedComment(currentUser.email, comment.id);
      setUpvoted(upvoteDB);
    };

    getUserDB();
  }, []);

  /**
   * Creates an entry on the DB "updates_comments" collection, updates the comment with the new score and updates the state of CommentsPoints and upvoted
   * @return [returns nothing]
   */
  const upvoteComment = async () => {
    await upvoteCommentDB(
      comment.id,
      commentsPoints,
      currentUser.email
    );

    const upvoteDB = await isUpvotedComment(currentUser.email, comment.id);
    setUpvoted(upvoteDB);
    setCommentsPoints(commentsPoints + 1);
  };

  /**
   * Deletes the entry on the DB "updates_comments" collection for the ID of the comment, updates the comment with the new score and updates the state of CommentsPoints and upvoted
   * @return [returns nothing]
   */
  const unvoteComment = async () => {
    await unvoteCommentDB(upvoted.id, comment.id, commentsPoints);
    const upvoteDB = await isUpvotedComment(currentUser.email, comment.id);
    setUpvoted(upvoteDB);
    setCommentsPoints(commentsPoints - 1);
  };

  return (
    <>
      {userComment && article && (
        <table className="comment">
          <tbody>
            <tr>
              <td valign="top" className="votelinks">
                {upvoted && !upvoted.isvoted && (
                  <a href="javascript:void(0)" onClick={upvoteComment}>
                    <div className="arrow_upvote" title="upvote"></div>
                  </a>
                )}{" "}
              </td>
              <td>
                <div>
                  <span>
                    <a className="boxhead" href={`/user/${userComment.email}`}>
                      {userComment.nickname}{" "}
                    </a>
                    <span>
                      {moment(
                        new Date(comment.created_at.seconds * 1000)
                      ).fromNow()}
                    </span>
                    {location.pathname.includes("comments") && (
                      <a className="boxhead" href={`/article/${article.id}`}>
                        | on: {article.title}
                      </a>
                    )}
                    {upvoted && upvoted.isvoted && (
                      <span>
                        {" "}
                        <a
                          className="boxhead"
                          href="javascript:void(0)"
                          onClick={unvoteComment}
                        >
                          | unvote{" "}
                        </a>
                      </span>
                    )}
                  </span>
                </div>

                <div>
                  <span className="comment">{comment.text}</span>
                  <div>
                    <a href={`/reply/${comment.id}`}>
                      <p className="reply">reply</p>
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <table className="replyTable">
        <tbody>
          {replies &&
            replies.map((reply, index) => (
              <tr key={index}>
                <td>
                  <Comment comment={reply} currentUser={currentUser} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>{" "}
    </>
  );
}
