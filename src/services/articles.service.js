import { db } from "../server/firebase-config"
import {collection, getDocs, addDoc } from 'firebase/firestore'

const articlesCollectionRef = collection(db, "articles");

const createArticle = async (newTitle, newUrl, newBody, user) => {
    try {
     if(newTitle === undefined || newTitle.match(/^ *$/) !== null) {
         alert("Titulo no introducido");
         return false;
     }
         else if(newUrl === undefined || newUrl.match(/^ *$/) !== null){
               
             alert("Password no introducido")
             return false;
         }
    else if(newBody === undefined || newBody.match(/^ *$/)){
     alert("Email no introducido o incorrecto")
     return false;
    } 

      await addDoc(articlesCollectionRef, {title: newTitle, url: newUrl, text: newBody, points: 0, created_at: new Date(), autor_email: user.email, autor_nickname: user.nickname});
      return true;
    } catch (error) {
      console.log(error)
    }
    
  
  };
  

const getArticles = async () => {
    const data = await getDocs(articlesCollectionRef);
    const d = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    
     return d;
 };
 

export {createArticle, getArticles}