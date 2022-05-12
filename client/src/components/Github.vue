<template>
  <div class="content">
    <div class="gitUrl">
      <img alt="Github" src="@/assets/GitImg.png" class="GitImg" />
      <a
        href="https://github.com/SamWilk/Vue-List"
        target="_blank"
        class="gitHub"
        >Github</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreatePost",
  props: {
    url: String,
  },
});
</script>

<style scoped>
.content {
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.gitUrl {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 10rem;
  justify-content: space-between;
}

.GitImg {
  width: 40px;
  height: 40px;
  background: black;
  padding: 5px;
  border-radius: 50%;
}
</style>
