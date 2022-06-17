import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCINcvZug_oR7fxB-_0J-4nl5j0xIl0UMQ",
    authDomain: "hackernews-331512.firebaseapp.com",
    projectId: "hackernews-331512",
    storageBucket: "hackernews-331512.appspot.com",
    messagingSenderId: "337436420247",
    appId: "1:337436420247:web:2fdaacce91d1ca57e321d2",
    measurementId: "G-MR0448NEWK"
  };


  const app = initializeApp(firebaseConfig);


  export const db = getFirestore()