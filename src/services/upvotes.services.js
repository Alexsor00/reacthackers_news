import { db } from "../server/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";



function ExceptioUpvote(msg, status) {
    this.body = msg;
    this.nombre = "ExceptionUpvote";
    this.status = status;
  }
  

const upvotesCollectionRef = collection(db, "upvotes");



const createUpvote = async (newArticle_id, newUser_id) => {

  
  
     if(newArticle_id === undefined || newUser_id === undefined) {
         throw new ExceptioUpvote("Debe de estar logeado para poder votar", -1);
             } 
  
  try {
        console.log((await isUpvoted(newArticle_id, newUser_id)).isvoted)
        await addDoc(upvotesCollectionRef, {article_id: newArticle_id, created_at: new Date(), user_id: newUser_id});
        return true;
    
 
  } catch (error) {
    return false;
  }
          

     
    
    
  
  };

  const deleteUpvote = async (upvote_id) => {

     try {
        const upvoteDoc = doc(db, "upvotes", upvote_id);
        await deleteDoc(upvoteDoc)
         return true;
     } catch (error) {
        return false;
     }
 

    
   
   
 
 };


  const isUpvoted = async (user_id, article_id) => {
    const data = await getDocs(upvotesCollectionRef);
    const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const result = d.filter((upvote) => (upvote.user_id === user_id && article_id === upvote.article_id));
    if(result.length >= 1) return { isvoted: true , id: result[0].id};
    else return { isvoted: false};
  }


  export {createUpvote, isUpvoted, deleteUpvote}