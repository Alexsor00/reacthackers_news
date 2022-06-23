import { db } from "../server/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const commentsCollectionRef = collection(db, "comments");



const createComment = async (newArticle_id, newText, newUser_id, newReplyComment_id) => {

  
    try {
     if(newText === undefined || newText.match(/^ *$/) !== null) {
         alert("No hay comentario creado");
         return false;
     } 
     await addDoc(commentsCollectionRef, {article_id: newArticle_id, text: newText, user_id: newUser_id, points: 0, created_at: new Date(), replyComment_id: newReplyComment_id});
      return true;
    } catch (error) {
     
    }
    
  
  };

  const getReplyComments = async (id) => {
   
    const data = await getDocs(commentsCollectionRef);
    const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = d.filter((comment) => comment.replyComment_id === id);
    return result;


  }

  const getComments = async () => {
    const data = await getDocs(commentsCollectionRef);
    const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return d;
  };

  const getCommentsby_User = async (user_id) => {
    const data = await getDocs(commentsCollectionRef);
    const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = d.filter((comment) => comment.user_id === user_id);
    return result;
  };
  



  const getComment = async (id) => {
    const data = await getDocs(commentsCollectionRef);
    const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = d.filter((comment) => comment.id === id);
    return result[0];
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


export {createComment, getCommentsArticle, getComment, getReplyComments, getComments, getCommentsby_User}