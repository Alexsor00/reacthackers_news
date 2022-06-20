import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Footer from "./Footer";
import Header from "./Header";
import MainData from "./MainData";
import Submit from "../Pages/Submit";
import { useEffect, useState } from "react";
import { getUser } from "../services/user.service";
import User from "../Pages/User";
import Submitted from "../Pages/Submitted";


export default function MainPage (){
   const   [currentUser, setCurrentUser ]  = useState(null)
   useEffect(() => {
    
     const localUser = JSON.parse(localStorage.getItem('currentUser'))
     if(localUser !== null) setCurrentUser(localUser)
     

   },[]);
     return(
         
          <Router>
          
         <Routes> 
         <Route path="/user/:user_email" element= {<User currentUser={currentUser}/>} />  
         <Route path="/submited/:user_email" element= {<center><Header currentUser={currentUser} setCurrentUser={setCurrentUser}/><Submitted /><Footer /></center>} />  

              <Route exact path="/" element= {<center><Header currentUser={currentUser} setCurrentUser={setCurrentUser}/><MainData /><Footer /></center>} />
               <Route exact path="/submit" element= {<Submit currentUser={currentUser} />} />  
               <Route exact path="/login" element= {<Login setCurrentUser={setCurrentUser}/>} />  

     </Routes>     
               
               
          </Router>  
     
     )
}