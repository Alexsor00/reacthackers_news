import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Footer from "./Footer";
import Header from "./Header";
import MainData from "./MainData";
import Submit from "../Pages/Submit";


export default function MainPage (){


     return(
         
          <Router>
          
         <Routes>
              
              <Route exact path="/" element= {<center><Header /><MainData /><Footer /></center>} />
               <Route exact path="/submit" element= {<Submit />} />  
               <Route exact path="/login" element= {<Login />} />  

     </Routes>     
               
               
          </Router>  
     
     )
}