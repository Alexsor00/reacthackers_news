import { db } from "../server/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const commentsCollectionRef = collection(db, "comments");



const createUser = async (newArticle_id, newText, newUser_id) => {
    try {
     if(newText === undefined || newText.match(/^ *$/) !== null) {
         alert("No hay comentario creado");
         return false;
     } 
      await addDoc(commentsCollectionRef, {article_id: newArticle_id, text: newText, user_id: newUser_id, points: 0, created_at: new Date()});
      return true;
    } catch (error) {
     
    }
    
  
  };

const getCommentsArticle = async (article_id) => {
    let dataComments = []
    const data = await getDocs(commentsCollectionRef);
    const d = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    d.forEach(comment => {

      if(comment.article_id === article_id) {

        dataComments.push(comment)
      }
      });
     return dataComments;
}


export {createUser, getCommentsArticle}