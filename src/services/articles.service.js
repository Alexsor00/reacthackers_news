import { db } from "../server/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const articlesCollectionRef = collection(db, "articles");

const createArticle = async (newTitle, newUrl, newBody, user) => {
  try {
    if (newTitle === undefined || newTitle.match(/^ *$/) !== null) {
      alert("Titulo no introducido");
      return false;
    } else if (newUrl === undefined || newUrl.match(/^ *$/) !== null) {
      alert("Password no introducido");
      return false;
    } else if (newBody === undefined || newBody.match(/^ *$/)) {
      alert("Email no introducido o incorrecto");
      return false;
    }

    await addDoc(articlesCollectionRef, {
      title: newTitle,
      url: newUrl,
      text: newBody,
      points: 0,
      created_at: new Date(),
      autor_email: user.email,
      autor_nickname: user.nickname,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

const upvoteArticle = async (id, points) => {
  const articleDoc = doc(db, "articles", id);
  console.log(points);
  const newFields = { points: points + 1 };
  await updateDoc(articleDoc, newFields);
};

const getArticles = async () => {
  const data = await getDocs(articlesCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  d.sort((a, b) =>
  a.points < b.points
    ? 1
    : b.points < a.points
    ? -1
    : 0
);

  return d;
};

const get_OrderedArticles = async () => {
  const data = await getDocs(articlesCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  d.sort((a, b) =>
    a.created_at.seconds < b.created_at.seconds
      ? 1
      : b.created_at.seconds < a.created_at.seconds
      ? -1
      : 0
  );

  return d;
};
const getArticles_byUser = async (user_email) => {
  const data = await getDocs(articlesCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const result = d.filter((article) => article.autor_email === user_email);
  return result;
};

const getArticle = async (id) => {
  const data = await getDocs(articlesCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const result = d.filter((article) => article.id === id);
  return result[0];
};

export {
  createArticle,
  getArticles,
  getArticle,
  getArticles_byUser,
  get_OrderedArticles,
  upvoteArticle,
};
