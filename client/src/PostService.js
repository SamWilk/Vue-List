const axios = require("axios");

const url = `http://localhost:${process.env.PORT}/api/posts/`;

class PostService {
  //getPost
  static getPost() {
    const temp = new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map((post) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
        );
      } catch (error) {
        reject(error);
      }
    });
    return temp;
  }

  //Create Post
  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }
  //Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
