import { db } from "../server/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const articlesCollectionRef = collection(db, "articles");

function ExceptionArticle(msg, status) {
  this.body = msg;
  this.nombre = "ExceptionArticle";
  this.status = status;
}

/**
 * Creates the DB entry for an article with the parameter values checking if those are valid
 * @param  {[String]} newTitle [The title of the new Article]
 * @param  {[Number]} newUrl [The url of the new Article]
 * @param  {[String]} newBody [The title of the new Article]
 * @param  {[Object]} user [The user that created the article]
 * @return {[Boolean]}    [Returns true if the article has been created succesfully or false if there was any error]
 */
const createArticle = async (newTitle, newUrl, newBody, user) => {
  if (!user) {
    throw new ExceptionArticle(
      "Debes de estar logeado para poder crear un articulo",
      0
    );
  } else if (newTitle.match(/^ *$/)) {
    throw new ExceptionArticle("Titulo no introducido", 1);
  } else if (newUrl.match(/^ *$/)) {
    if (newBody.match(/^ *$/)) {
      throw new ExceptionArticle(
        "El campo de texto o url debe de estar rellenado",
        1
      );
    }
  } else if (!newBody.match(/^ *$/) && !newUrl.match(/^ *$/)) {
    throw new ExceptionArticle(
      "Únicamente se podrá crear un artículo con URL o con texto, nunca las dos a la vez",
      1
    );
  }
  if (newBody.match(/^ *$/)) {
    await addDoc(articlesCollectionRef, {
      title: newTitle,
      url: newUrl,
      points: 0,
      created_at: new Date(),
      autor_email: user.email,
      autor_nickname: user.nickname,
    });
    return true;
  } else if (newUrl.match(/^ *$/)) {
    await addDoc(articlesCollectionRef, {
      title: newTitle,
      text: newBody,
      points: 0,
      created_at: new Date(),
      autor_email: user.email,
      autor_nickname: user.nickname,
    });
    return true;
  }
};

/**
 * Update the Article DB entry for the upvote functionality adding 1 to the "points" attribute
 * @param  {[String]} id [The id of the Article wanted to upvote]
 * @param  {[Number]} points [The points of the article to update]
 * @return [Returns nothing]
 */
const upvoteArticle = async (id, points) => {
  const articleDoc = doc(db, "articles", id);
  const newFields = { points: points + 1 };
  await updateDoc(articleDoc, newFields);
};

/**
 * Update the Article DB entry for the upvote functionality substracting 1 to the "points" attribute
 * @param  {[String]} id [The id of the Article wanted to unvote]
 * @param  {[Number]} points [The points of the article to update]
 * @return [Returns nothing]
 */
const unvoteArticle = async (id, points) => {
  const articleDoc = doc(db, "articles", id);
  const newFields = { points: points - 1 };
  await updateDoc(articleDoc, newFields);
};

/**
 * Gets all the articles from the DB.
 * @return {[Array]} [Returns an array of Articles]
 */
const getArticles = async () => {
  const data = await getDocs(articlesCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  d.sort((a, b) => (a.points < b.points ? 1 : b.points < a.points ? -1 : 0));

  return d;
};

/**
 * Gets all the articles from the DB ordered by time creation.
 * @return {[Array]} [Returns an array of Articles]
 */
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

/**
 * Gets all the articles from the DB that have been created by an specific user.
 * @param  {[String]} user_email [The email(ID) of the article creator to search]
 * @return {[Array]} [Returns an array of Articles]
 */
const getArticles_byUser = async (user_email) => {
  const data = await getDocs(articlesCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const result = d.filter((article) => article.autor_email === user_email);
  return result;
};

/**
 * Gets an specific article.
 * @param  {[String]} id [The ID of the article to get]
 * @return {[Object]} [Returns an Articles]
 */
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
  unvoteArticle,
};
