import { db } from "../server/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const commentsCollectionRef = collection(db, "comments");

/**
 * Creates the DB entry for a comment with the parameter values checking if those are valid
 * @param  {[String]} newArticle_id [The article ID in which the comment is going to be created]
 * @param  {[String]} newText [The text of the new comment]
 * @param  {[String]} newUser_id [The user ID of the new comment]
 * @param  {[String]} newReplyComment_id [The ID of the comment if the comment to create is a reply]
 * @return {[Boolean]}    [Returns true if the comment has been created succesfully or false if there was any error]
 */
const createComment = async (
  newArticle_id,
  newText,
  newUser_id,
  newReplyComment_id
) => {
  try {
    if (newText === undefined || newText.match(/^ *$/) !== null) {
      alert("No hay comentario creado");
      return false;
    }
    await addDoc(commentsCollectionRef, {
      article_id: newArticle_id,
      text: newText,
      user_id: newUser_id,
      points: 0,
      created_at: new Date(),
      replyComment_id: newReplyComment_id,
    });
    return true;
  } catch (error) {}
};

/**
 * Gets the comments that are a reply of other comment
 * @param  {[String]} id [The parent comment]
 * @return {[Array]}    [Returns an Array of comments]
 */
const getReplyComments = async (id) => {
  const data = await getDocs(commentsCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const result = d.filter((comment) => comment.replyComment_id === id);
  return result;
};

/**
 * Gets all the comments.
 * @return {[Array]}   [Returns an Array of comments]
 */
const getComments = async () => {
  const data = await getDocs(commentsCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return d;
};

/**
 * Gets the comments of an specific user.
 * @param  {[String]} user_id [The id of the user creator]
 * @return {[Array]}    [Returns an Array of comments]
 */
const getCommentsby_User = async (user_id) => {
  const data = await getDocs(commentsCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const result = d.filter((comment) => comment.user_id === user_id);
  return result;
};

/**
 * Gets an specific comment.
 * @param  {[String]} id [The id of the comment to search]
 * @return {[Array]}    [Returns a comment]
 */
const getComment = async (id) => {
  const data = await getDocs(commentsCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const result = d.filter((comment) => comment.id === id);
  return result[0];
};

/**
 * Gets the comments of an specific article.
 * @param  {[String]} article_id [The id of the article]
 * @return {[Array]}    [Returns an Array of comments]
 */
const getCommentsArticle = async (article_id) => {
  let dataComments = [];
  const data = await getDocs(commentsCollectionRef);
  const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  d.forEach((comment) => {
    if (comment.article_id === article_id) {
      dataComments.push(comment);
    }
  });
  return dataComments;
};

/**
 * Update the comment DB entry for the upvote functionality adding 1 to the "points" attribute
 * @param  {[String]} id [The id of the comment wanted to upvote]
 * @param  {[Number]} points [The points of the comment to update]
 * @return [Returns nothing]
 */
const upvoteComment = async (id, points) => {
  const commentDoc = doc(db, "comments", id);
  const newFields = { points: points + 1 };
  await updateDoc(commentDoc, newFields);
};

/**
 * Update the comment DB entry for the upvote functionality substracting 1 to the "points" attribute
 * @param  {[String]} id [The id of the comment wanted to unvote]
 * @param  {[Number]} points [The points of the comment to update]
 * @return [Returns nothing]
 */
const unvoteComment = async (id, points) => {
  const commentDoc = doc(db, "comments", id);
  const newFields = { points: points - 1 };
  await updateDoc(commentDoc, newFields);
};

export {
  createComment,
  getCommentsArticle,
  getComment,
  getReplyComments,
  getComments,
  getCommentsby_User,
  upvoteComment,
  unvoteComment,
};
