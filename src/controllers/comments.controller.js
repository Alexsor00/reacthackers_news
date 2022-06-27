import { unvoteComment, upvoteComment } from "../services/comments.service";
import {
  createUpvoteComment,
  deleteUpvoteComment,
} from "../services/upvotes.services";


/**
 * Creates the DB entry for an upvote with the parameter values and updates the existing comment
 * @param  {[String]} id [The id of the comment wanted to upvote]
 * @param  {[Number]} points [The points of the comment to update]
 * @param  {[String]} user_id [The ID of the user that upvoted the comment]
 * @return {[Number]}    [Returns 1 if the comment has been updated succesfully or -1 if there was any error]
 */
const upvoteCommentDB = async (id, points, user_id) => {
  try {
    const status = await createUpvoteComment(id, user_id);
    if (status) await upvoteComment(id, points);
  } catch (error) {
    if (error.status === -1) {
      alert(error.body);
      return;
    }
  }
};


/**
 * Deletes the DB entry for an specific upvote with the entry ID value and updates the existing comment
 * @param  {[String]} upvote_id [The id of the upvote entry on the DB]
 * @param  {[Number]} comment_id [The id of the comment wanted to unvote]
 * @param  {[String]} points [The points of the comment to update]
 * @return {[Number]}    [Returns 1 if the comment has been updated succesfully or -1 if there was any error]
 */
const unvoteCommentDB = async (upvote_id, comment_id, points) => {
  try {
    const status = await deleteUpvoteComment(upvote_id);
    if (status) await unvoteComment(comment_id, points);
  } catch (error) {
    if (error.status === -1) {
      alert(error.body);
      return;
    }
  }
};

export { upvoteCommentDB, unvoteCommentDB };
