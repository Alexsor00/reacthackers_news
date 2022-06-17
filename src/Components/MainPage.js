import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import MainData from "./MainData";
import Submit from "./Submit";


export default function MainPage (){


     return(
         
         <center>
          <Router>
          
         <Routes>
              
              <Route exact path="/" element= {<><Header /><MainData /><Footer /></>} />
               <Route exact path="/submit" element= {<Submit />} />  

     </Routes>     
               
               
          </Router>  
     
        </center>
     )
}