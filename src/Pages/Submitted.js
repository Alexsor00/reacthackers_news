import { useEffect, useState } from 'react'
import { getArticles, getArticles_byUser } from '../services/articles.service';
import { getUser } from '../services/user.service';
import { useParams } from "react-router-dom";

import Entry from '../Components/Entry'
import moment from 'moment';
export default function Submitted (){
    const { user_email } = useParams()

    const [articles, setArticles] = useState(null)
    console.log(articles)
    useEffect(() => {
       const getDBArticles = async ()=> {
         const data = await getArticles_byUser(user_email);
         setArticles(data);
       }
       getDBArticles();
    }, []);
   return(

    <table className="mainTable">
       <tbody>
         {articles !== null && articles.map((article) => {

            const from_now = moment(new Date(article.created_at.seconds * 1000)).fromNow();
             return <Entry title={article.title} url={article.url} points={article.points} autor={article.autor_email} created_at={from_now}/>
           })}
      

       </tbody>
    </table>
   )

}