import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../services/articles.service";
import { createComment, getCommentsArticle, getReplyComments } from "../services/comments.service";
import { getUser } from "../services/user.service";
import moment from "moment";

import './Article.css'
import Comment from "../Components/Comment";

export default function Article ({currentUser}){
    const { article_id } = useParams();
    const [user, setUser] = useState(null);


    const [comments, setComments] = useState(null)
    const [article, setArticle] = useState(null)
    const [commentText, setCommentText] = useState("")

        const getDBArticles = async () => {
          const data = await getArticle(article_id);
          setArticle(data);
          return data;
        };
      

      useEffect(() => {
        
        const getUserDB = async () => {
         const data = await getDBArticles();

          const user = await getUser(data.autor_email);
          setUser(user);

          
         
        };
    
        getUserDB();
      }, []);

    useEffect(() => {
        const getCommentsArticleDB = async () => {
          const data_article = await getDBArticles();
          const data = await getCommentsArticle(data_article.id);
          console.log(data)
          setComments(data);
        };
        getCommentsArticleDB();
      }, []);
 

      const submit = async (e) => {
        e.preventDefault();
        try {
          console.log("id: " + user.email)
            await createComment(article.id, commentText, user.email, -1);
        } catch (error) {
          if (error.status === 0) {
            alert(error.body);
            return;
          }
        }
      };

      const handleChange = (e) => {
        setCommentText(e.target.value)
      }

      return (
        <>
      {article && user && 
      <>
       <table className="aTable">
       <tbody className="body">
        <tr className="separator"><td></td></tr>
        <tr className="separator"><td></td></tr>
        <tr className="separator"><td></td></tr>

       <tr >
       
        <td valign="top" className="votelink">
            <a>
              <div className="arrow" title="upvote"></div>
            </a>
        </td>
        <td className="title">
            <a href={`/article/${article.id}`}>{article.title}</a>{" "}
          </td>
       
        
      </tr>
      <tr>
      <td ></td>
      <td className="subtext">
          <span>{article.points} points</span> by
          {user !== null && <a href={`/user/${user.email}`}> {user.nickname}</a>}
          <a>
            {" "}
            {moment(
              new Date(article.created_at.seconds * 1000)
            ).fromNow()}
          </a>{" "}
          | hide |<a> {comments && comments.length}</a>
        </td>
      </tr>
      
           <tr>

           </tr>
           <tr>
           <td></td>

               <td>{article.text}</td>
               <td>
               </td>
           </tr>

           <tr>
            <td></td>
            <td>

                <form className="addComment">
                <textarea onChange={handleChange} name="text" rows="8" cols="80" value = {commentText}></textarea>
                <br></br>
                <br></br>
          <input type="submit" className="submit" onClick={submit} value="add comment"></input>
                </form>


            </td>
           </tr>

       </tbody>
   </table>
 

   <table className="aTable"> 
       <tbody>
         {comments && comments.map((comment) => {
            console.log(comment.replyComment_id)
            return comment.replyComment_id === -1 ? <tr><td><Comment comment={comment}/></td></tr> : <></>

         })}

       </tbody>
   </table>

   </>

   }
       
        </>
      )
    



}