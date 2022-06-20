import { upvoteArticle } from "../services/articles.service";

const upvote = async (id, points) => {
  await upvoteArticle(id, points);
};

export { upvote };
