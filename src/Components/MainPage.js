import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Footer from "./Footer";
import Header from "./Header";
import MainData from "./MainData";
import Submit from "../Pages/Submit";
import { useEffect, useState } from "react";
import User from "../Pages/User";
import Submitted from "../Pages/Submitted";
import Newest from "../Pages/Newest";
import Article from "../Pages/Article";
import Reply from "../Pages/Reply";
import Comments from "../Pages/CommentsUser";
import AllComments from "../Pages/AllComment";


export default function MainPage (){



   const   [currentUser, setCurrentUser ]  = useState(null);


   useEffect(() => {
     const localUser = JSON.parse(localStorage.getItem('currentUser'))
     if(localUser !== null) setCurrentUser(localUser)
   },[]);

   
     return(
     <Router>
          <Routes> 
               <Route path="/user/:user_email" element= {<User currentUser={currentUser}/>} />  
               <Route path="/submited/:user_email" element= {<center><Header currentUser={currentUser} setCurrentUser={setCurrentUser}/><Submitted /><Footer /></center>} />  
               <Route exact path="/newest" element= {<center><Header currentUser={currentUser} setCurrentUser={setCurrentUser}/><Newest currentUser={currentUser}/><Footer /></center>} />
               <Route path="/article/:article_id" element= {<center><Header currentUser={currentUser} setCurrentUser={setCurrentUser}/><Article currentUser={currentUser}/><Footer /></center>} />  
               <Route path="/comments/:user_email" element= {<center><Header currentUser={currentUser} setCurrentUser={setCurrentUser}/><Comments currentUser={currentUser}/><Footer /></center>} />  
               <Route path="/reply/:comment_id" element= {<center><Header currentUser={currentUser} setCurrentUser={setCurrentUser}/><Reply currentUser={currentUser}/></center>} />  
               <Route path="/comments" element= {<center><Header currentUser={currentUser} setCurrentUser={setCurrentUser}/><AllComments currentUser={currentUser}/></center>} />  
               <Route exact path="/" element= {<center><Header currentUser={currentUser} setCurrentUser={setCurrentUser}/><MainData  currentUser ={currentUser}/><Footer /></center>} />
               <Route exact path="/submit" element= {<Submit currentUser={currentUser} />} />  
               <Route exact path="/login" element= {<Login setCurrentUser={setCurrentUser}/>} />  
          </Routes>               
     </Router>  
     )
}