<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <CreatePost />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreatePost from "../components/CreatePost.vue"; // @ is an alias to /src

export default defineComponent({
  name: "CreatePostView",
  components: {
    CreatePost,
  },
});
</script>
