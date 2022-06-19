import { useEffect, useState } from 'react'
import { getArticles } from '../services/articles.service';
import { getUser } from '../services/user.service';
import Entry from './Entry'
import moment from 'moment';
import './MainData.css'
export default function MainData (){
  
    const [articles, setArticles] = useState(null)
    console.log(articles)
    useEffect(() => {
       const getDBArticles = async ()=> {
         const data = await getArticles();
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