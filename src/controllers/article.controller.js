import { unvoteArticle, upvoteArticle } from "../services/articles.service";
import {
  createUpvoteArticle,
  deleteUpvoteArticle,
} from "../services/upvotes.services";

/**
 * Creates the DB entry for an upvote with the parameter values and updates the existing article
 * @param  {[String]} id [The id of the article wanted to upvote]
 * @param  {[Number]} points [The points of the article to update]
 * @param  {[String]} user_id [The ID of the user that upvoted the article]
 * @return {[Number]}    [Returns 1 if the article has been updated succesfully or -1 if there was any error]
 */
const upvoteArticleDB = async (article_id, points, user_id) => {
  try {
    const status = await createUpvoteArticle(article_id, user_id);
    if (status) await upvoteArticle(article_id, points);
    return 1
  } catch (error) {
    if (error.status === -1) {
      alert(error.body);
      return -1;
    }
  }
};


/**
 * Deletes the DB entry for an specific upvote with the entry ID value and updates the existing article
 * @param  {[String]} upvote_id [The id of the upvote entry on the DB]
 * @param  {[Number]} article_id [The id of the article wanted to unvote]
 * @param  {[String]} points [The points of the article to update]
 * @return {[Number]}    [Returns 1 if the article has been updated succesfully or -1 if there was any error]
 */
const unvote = async (upvote_id, article_id, points) => {
  try {
    const status = await deleteUpvoteArticle(upvote_id);
    if (status) await unvoteArticle(article_id, points);
    return 1;
  } catch (error) {
    if (error.status === -1) {
      alert(error.body);
      return -1;
    }
  }
};

export { upvoteArticleDB, unvote };
