import { unvoteArticle, upvoteArticle } from "../services/articles.service";
import { createUpvote, deleteUpvote } from "../services/upvotes.services";

const upvote = async (id, points, article_id, user_id) => {
try {
  const status = await createUpvote(article_id, user_id)
  if(status) await upvoteArticle(id, points);

} catch (error) {
  if(error.status === -1){
    alert(error.body);
    return;
  }
}

};


const unvote = async (upvote_id, article_id, points) => {
  try {
    const status = await deleteUpvote(upvote_id)
    if(status) await unvoteArticle(article_id, points);
  
  } catch (error) {
    if(error.status === -1){
      alert(error.body);
      return;
    }
  }
  
  };

export { upvote, unvote };
