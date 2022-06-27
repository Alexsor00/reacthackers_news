import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../Components/Comment";
import { getCommentsby_User } from "../services/comments.service";

export default function Comments({ currentUser }) {
  const { user_email } = useParams();

  const [comments, setComments] = useState(null);

  useEffect(() => {
    const getCommentsUserDB = async () => {
      const data = await getCommentsby_User(user_email);
      setComments(data);
    };

    getCommentsUserDB();
  }, [user_email]);
  return (
    <>
      {" "}
      <table className="aTable">
        <tbody>
          {comments &&
            comments.map((comment, index) => {
              return comment.replyComment_id === -1 ? (
                <tr key={index}>
                  <td>
                    <Comment
                      comment={comment}
                      currentUser={currentUser}
                      key={index}
                    />
                  </td>
                </tr>
              ) : (
                <tr key={index}></tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
