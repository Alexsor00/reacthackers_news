import { db } from "../server/firebase-config"
import {collection, getDocs, addDoc } from 'firebase/firestore'

const usersCollectionRef = collection(db, "users");



const getUsers = async () => {
   const data = await getDocs(usersCollectionRef);
   const d = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

    return d;
};


const createUser = async (newNickname, newPassword, newEmail) => {
   try {
    if(newNickname === undefined || newNickname.match(/^ *$/) !== null) {
        alert("Username no introducido");
        return false;
    }
        else if(newPassword === undefined || newPassword.match(/^ *$/) !== null){
              
            alert("Password no introducido")
            return false;
        }
   else if(newEmail === undefined || !newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
    alert("Email no introducido o incorrecto")
    return false;
   } 
     await addDoc(usersCollectionRef, {nickname: newNickname, password: newPassword, email: newEmail, points: 0});
     return true;
   } catch (error) {
    
   }
   
 
 };
 


export {getUsers, createUser};