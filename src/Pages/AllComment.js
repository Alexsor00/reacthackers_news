import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Comment from "../Components/Comment";
import { getComments, getCommentsby_User } from "../services/comments.service";


export default function AllComments () {
  
    const [comments, setComments] = useState(null)
    
    useEffect(() => {
        const getCommentsUserDB = async () => {
            const data = await getComments();
            setComments(data)
        }   

        getCommentsUserDB()
    }, [])
    return(
<> <table className="aTable">
            <tbody>
              {comments &&
                comments.map((comment, index) => {
                  return comment.replyComment_id === -1 ? (
                    <tr key={index}>
                      <td>
                        <Comment comment={comment}  key={index} />
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}></tr> 
                  );
                })}
            </tbody>
          </table>
</>
    )
}