import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../services/articles.service";
import { getCommentsArticle } from "../services/comments.service";
import { getUser } from "../services/user.service";
import moment from "moment";

import './Article.css'

export default function Article ({currentUser}){
    const { article_id } = useParams();
    const [user, setUser] = useState(null);


    const [comments, setComments] = useState(null)
    const [article, setArticle] = useState(null)
    useEffect(() => {
        const getDBArticles = async () => {
          const data = await getArticle(article_id);
          setArticle(data);
        };
        getDBArticles();
      }, []);

      useEffect(() => {
        const getUserDB = async () => {
          const user = await getUser(article.autor_email);
          setUser(user);
        };
    
        getUserDB();
      }, []);

    useEffect(() => {
        const getCommentsArticleDB = async () => {
          const data = await getCommentsArticle(article.id);
          setComments(data);
        };
        getCommentsArticleDB();
      }, []);
 
      console.log(comments)

  const handleClick = () => {
   /*
CREATE THE COMMENT
   */
}


      return (
        <>
      {article && 
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
            <a href={`article/${article.id}`}>{article.title}</a>{" "}
          </td>
       
        
      </tr>
      <tr>
      <td ></td>
      <td className="subtext">
          <span>{article.points} points</span> by
          {user !== null && <a href={`user/${user.email}`}> {user.nickname}</a>}
          <a>
            {" "}
            {moment(
              new Date(article.created_at.seconds * 1000)
            ).fromNow()}
          </a>{" "}
          | hide |<a> 171 Comments</a>
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
                <textarea name="text" rows="8" cols="80"></textarea>
                <br></br>
                <br></br>
          <input type="submit" onClick={handleClick} value="add comment"></input>
                </form>


            </td>
           </tr>

       </tbody>
   </table>}
       
        </>
      )
    



}