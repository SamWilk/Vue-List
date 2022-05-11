/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";

const url = "http://localhost:2020/api/posts/";

class PostService {
  //Get posts
  static getPost(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const { data } = res;
        resolve(
          data.map((post: { createdAt: string | number | Date }) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
        );
      } catch (error: any) {
        reject(error.message);
      }
    });
  }

  //Create Post
  static createPost(text: string): Promise<any> {
    return axios.post(url, {
      text,
    });
  }

  //Update Post
  static updatePost(id: string, text: string): Promise<any> {
    return axios.put(`${url}${id}`, {
      text,
    });
  }

  //Delete Post
  static deletePost(id: string): Promise<any> {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
