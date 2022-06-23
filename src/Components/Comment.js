import { useEffect, useState } from "react";
import { getUser } from "../services/user.service";
import "./Comment.css";
import moment from "moment";
import { getReplyComments } from "../services/comments.service";
import { getArticle } from "../services/articles.service";
import {useLocation } from 'react-router-dom';

export default function Comment({ comment }) {
  const [userComment, setUserComment] = useState(null);

  const [replies, setReplies] = useState(null);
  const [article, setArticle] = useState(null);
  const location = useLocation();  
  useEffect(() => {
    const getUserDB = async () => {
      const user = await getUser(comment.user_id);
      setUserComment(user);
      const dataReplies = await getReplyComments(comment.id);
      setReplies(dataReplies);
      const articleDB = await getArticle(comment.article_id);
      setArticle(articleDB)
    };
    getUserDB();
  }, []);

  return (
    <>
      {userComment && article && (
        <table className="comment">
          <tbody>
            <tr>
              <td valign="top" className="votelinks">
                <a
                  id="up_31821904"
                  href="vote?id=31821904&amp;how=up&amp;goto=item%3Fid%3D31821269"
                >
                  <div className="arrow2" title="upvote"></div>
                </a>{" "}
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
                    {location.pathname.includes("comments") &&                     <a className="boxhead" href={`/article/${article.id}`} >| on: {article.title}</a>
}
                    
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
              <tr   key={index}>
                <td>
                  <Comment comment={reply} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>{" "}
    </>
  );
}
