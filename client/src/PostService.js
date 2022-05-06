import axios from "axios";

const url = `http://localhost:${process.env.PORT}/api/posts/`;

class PostService {
  //getPost
  static getPost() {
    return new Promise(async (resolve, reject) => {
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
  }

  //Create Post
  static insertPost(text) {
    return axios.post(url, {
      text,
    });
  }
  //Delete Post
  static insertPost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
