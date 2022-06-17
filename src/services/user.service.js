import { db } from "../server/firebase-config"
import {collection, getDocs } from 'firebase/firestore'

const usersCollectionRef = collection(db, "users");



const getUsers = async () => {
   const data = await getDocs(usersCollectionRef);
   const d = data.docs.map((doc) => ({...doc.data(), id: doc.id}))

    return d;
};


export {getUsers};