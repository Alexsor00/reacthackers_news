
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createComment, getComment, getReplyComments } from "../services/comments.service";
import { getUser } from "../services/user.service";

import './Reply.css'

export default function Reply({currentUser}){
    const { comment_id } = useParams();
     
    const [user, setUser] = useState(null)
    const [comment, setComment] = useState(null)
    const [replyText, setReplyText] = useState("")
    const [replies, setReplies] = useState(null)

      useEffect(() => {
        
        const getCommentDB = async () => {
         const data = await getComment(comment_id);
         setComment(data)
          const user = await getUser(data.user_id);
          setUser(user);

        };
        getCommentDB();

      }, []);


      const handleChange = (e) => {
        setReplyText(e.target.value)
      }


      const reply = async (e) => {
        e.preventDefault();
        try {
            await createComment(comment.article_id, replyText, currentUser.email, comment.id);
        } catch (error) {
          if (error.status === 0) {
            alert(error.body);
            return;
          }
        }
      };


 return(
    <>
    {comment && user && 
    <>
     <table className="aTable">
     <tbody className="body">
      <tr className="separator"><td></td></tr>
      <tr className="separator"><td></td></tr>
      <tr className="separator"><td></td></tr>
      <tr>
    <td ></td>
    <td className="subtext">
        <span>{comment.points} points</span> by
        {user !== null && <a href={`/user/${user.email}`}> {user.nickname}</a>}
        <a>
          {" "}
          {moment(
            new Date(comment.created_at.seconds * 1000)
          ).fromNow()}
        </a>{" "}
        | hide |
      </td>
    </tr>
        <tr >
        
        <td valign="top" className="votelink">
            <a>
                <div className="arrow" title="upvote"></div>
            </a>
        </td>
        <td className="title">
            <a href={`/comment/${comment.id}`}>{comment.text}</a>{" "}
            </td>
        
        
        </tr>
  
    
         <tr>

         </tr>
         <tr>
         <td></td>

             <td>
             </td>
         </tr>

         <tr>
          <td></td>
          <td>

              <form className="addComment">
              <textarea onChange={handleChange} name="text" rows="8" cols="80" ></textarea>
              <br></br>
              <br></br>
        <input type="submit" className="submit"  onClick={reply} value="reply"></input>
              </form>


          </td>
         </tr>

     </tbody>
 </table>


 

 </>

 }
     
      </>
  
 )
  



}