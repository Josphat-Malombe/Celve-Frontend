/*This is an service file specifically for the articles secton. It uses the api instance defined in app.js. In it there is
the fetchArticle fucntion which gets a list of the articles from the backend endpoint.create articles is used for creating an instance
article in the backend taking in data which include title,content.getArticles list articles but for auntheticated users.getArticleById
shows content of a speific article by using the slug which s unique. The functons are then exported  */

import api from "./app";

const fetchArticles = () => {
    return api.get("list/articles")
}
const createArticle=(articleData) =>{
    return api.post('create/articles', articleData)
}

const getArticles = () => {
    return api.get('main/articles')
}
export const getArticleById = (slug) => {
  return api.get(`/main/articles/${slug}`);
};
export default {
    fetchArticles,
    createArticle,
    getArticles,
    getArticleById,
}