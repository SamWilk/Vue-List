<template>
  <div class="hello">
    <p class="error" v-if="err">{{ err }}</p>
    <div class="inputCont">
      <label for="inputCont" class="inputLabel"
        >Create a todo
        <input
          type="text"
          class="field"
          placeholder="Create a todo"
          v-model="text"
        />
        <button class="submitBtn" @click="createPost">Create</button></label
      >
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
      >
        <p
          v-bind:style="flag ? 'color: gray' : 'color: black'"
          @dblclick="deletePost(post._id)"
          :disabled="flag"
          @click="updatePost(post._id)"
        >
          {{ post.text }}
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
  name: "HelloWorld",
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
      await PostService.createPost(this.text);
      this.posts = await PostService.getPost();
      this.text = "";
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
