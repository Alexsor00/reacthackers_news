import { db } from "../server/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function ExceptioUpvote(msg, status) {
  this.body = msg;
  this.nombre = "ExceptionUpvote";
  this.status = status;
}

const upvotesArticleCollectionRef = collection(db, "upvotes_articles");
const upvotesCommentsCollectionRef = collection(db, "upvotes_comments");

/**
 * Creates the DB entry for an article upvote with the parameter values
 * @param  {[String]} newArticle_id [The id of the article wanted to upvote]
 * @param  {[String]} newUser_id [The ID of the user that upvoted the article]
 * @return {[Boolean]}    [Returns true if the article has been updated succesfully or false if there was any error]
 */
const createUpvoteArticle = async (newArticle_id, newUser_id) => {
  if (newArticle_id === undefined || newUser_id === undefined) {
    throw new ExceptioUpvote("Debe de estar logeado para poder votar", -1);
  }

  try {
    await addDoc(upvotesArticleCollectionRef, {
      article_id: newArticle_id,
      created_at: new Date(),
      user_id: newUser_id,
    });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Creates the DB entry for an comment upvote with the parameter values
 * @param  {[String]} newComment_id [The id of the comment wanted to upvote]
 * @param  {[String]} newUser_id [The ID of the user that upvoted the comment]
 * @return {[Boolean]}    [Returns true if the comment has been updated succesfully or false if there was any error]
 */

const createUpvoteComment = async (newComment_id, newUser_id) => {
  if (newComment_id === undefined || newUser_id === undefined) {
    throw new ExceptioUpvote("Debe de estar logeado para poder votar", -1);
  }

  try {
    await addDoc(upvotesCommentsCollectionRef, {
      comment_id: newComment_id,
      created_at: new Date(),
      user_id: newUser_id,
    });
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Deletes the DB entry for an specific article upvote with the entry ID value
 * @param  {[String]} upvote_id [The id of the upvote entry on the DB]
 * @return {[Boolean]}    [Returns true if the article upvote has been deleted succesfully or false if there was any error]
 */
const deleteUpvoteArticle = async (upvote_id) => {
  try {
    const upvoteDoc = doc(db, "upvotes_articles", upvote_id);
    await deleteDoc(upvoteDoc);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Deletes the DB entry for an specific comment upvote with the entry ID value
 * @param  {[String]} upvote_id [The id of the upvote entry on the DB]
 * @return {[Boolean]}    [Returns true if the comment upvote has been deleted succesfully or false if there was any error]
 */
const deleteUpvoteComment = async (upvote_id) => {
  try {
    const upvoteDoc = doc(db, "upvotes_comments", upvote_id);
    await deleteDoc(upvoteDoc);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Search if the user voted an specific article
 * @param  {[String]} user_id [The id of the user]
 * @param  {[String]} article_id [The id of the article]
 * @return {[Object]}    [Returns an object. If the article has been voted by the user returns an Object with two parameters {isvoted: true, id: (id of the article)} if its has not been voted only returns {isvoted: false}]
 */
const isUpvotedArticle = async (user_id, article_id) => {
  const data = await getDocs(upvotesArticleCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const result = d.filter(
    (upvote) => upvote.user_id === user_id && article_id === upvote.article_id
  );
  if (result.length >= 1) return { isvoted: true, id: result[0].id };
  else return { isvoted: false };
};

/**
 * Search if the user voted an specific comment
 * @param  {[String]} user_id [The id of the user]
 * @param  {[String]} article_id [The id of the comment]
 * @return {[Object]}    [Returns an object. If the comment has been voted by the user returns an Object with two parameters {isvoted: true, id: (id of the comment)} if its has not been voted only returns {isvoted: false}]
 */
const isUpvotedComment = async (user_id, comment_id) => {
  const data = await getDocs(upvotesCommentsCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const result = d.filter(
    (upvote) => upvote.user_id === user_id && comment_id === upvote.comment_id
  );
  if (result.length >= 1) return { isvoted: true, id: result[0].id };
  else return { isvoted: false };
};

export {
  createUpvoteArticle,
  createUpvoteComment,
  isUpvotedArticle,
  isUpvotedComment,
  deleteUpvoteArticle,
  deleteUpvoteComment,
};
