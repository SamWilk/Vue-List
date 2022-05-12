/* eslint-disable prettier/prettier */
<template>
  <div class="hello">
    <p class="error" v-if="err">{{ err }}</p>
    <div class="inputCont">
      <label for="inputCont" class="inputLabel"
        >Create a todo
        <textarea
          type="text"
          class="field"
          placeholder="Create a todo"
          v-model="text"
          rows="5"
        />
        <button class="Btn" @click="createPost" :disabled="flag">Create</button>
      </label>
    </div>
    <div class="updatePost" v-if="updateFlag">
      <input type="text" class="updateIn" />
    </div>
    <div class="container">
      <div
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        class="Flip"
      >
        <p
          v-bind:style="
            flag ? 'color: gray; background: #005260' : 'color: black'
          "
          class="eachPost"
        >
          <label
            for="date"
            class="date"
            v-bind:style="flag ? 'background: #92C93C' : ''"
            >{{ post.createdAt.getMonth() }}/{{ post.createdAt.getDate() }}/{{
              post.createdAt.getFullYear()
            }}
          </label>
          {{ post.text }}
          <button @click="deletePost(post._id)" :disabled="flag" class="Btn">
            Delete
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import PostService from "../PostService.ts";
import PostService from "../PostService";

export default defineComponent({
  name: "CreatePost",
  data() {
    return {
      posts: [],
      err: "",
      text: "",
      flag: false,
      updateFlag: false,
      udateText: "",
    };
  },

  async created() {
    try {
      this.posts = await PostService.getPost();
    } catch (error: any) {
      this.err = error.message;
    }
  },
  methods: {
    async createPost() {
      this.flag = !this.flag;
      await PostService.createPost(this.text);
      this.posts = await PostService.getPost();
      this.text = "";
      this.flag = !this.flag;
    },
    async deletePost(id: string) {
      this.flag = true;
      await PostService.deletePost(id);
      this.posts = await PostService.getPost();
      this.flag = false;
    },
    async updatePost(id: string) {
      this.updateFlag = !this.updateFlag;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Ubuntu&display=swap");

.hello {
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: auto;
  width: 40vw;
  height: 90vh;
  font-family: "Ubuntu", sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.container::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

.inputLabel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  min-width: 30vw;
}

.field {
  min-width: 30vw;
  height: 1.5rem;
  outline: none;
  border-radius: 6px;
  border: 1px solid black;
}

.Flip {
  display: flex;
  flex-direction: column;
  min-width: 100%;
}

.eachPost {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  border: 1px solid black;
  border-radius: 6px;
  margin: 1rem;
  background: #92c93c;
}

.date {
  position: relative;
  top: 0;
  padding: 0.25rem 1rem;
  background: #e9f6d0;
  border-radius: 6px;
  border: 1px solid #005260;
}

.Btn {
  padding: 0.3rem 1rem;
  max-width: 5rem;
  border: 1px solid #005260;
  color: #005260;
  border-radius: 6px;
  margin-top: 0.5rem;
  background: transparent;
  transition: 0.2s ease;
  cursor: pointer;
}

.BtnDis {
  padding: 0.3rem 1rem;
  max-width: 5rem;
  border: 1px solid #005260;
  color: #005260;
  border-radius: 6px;
  margin-top: 0.5rem;
  background: transparent;
  transition: 0.2s ease;
  pointer-events: none;
}

.Btn:hover {
  background: #005260;
  color: white;
}
</style>
