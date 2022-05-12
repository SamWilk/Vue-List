<template>
  <div class="about">
    <Github url="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Github from "../components/Github.vue";

export default defineComponent({
  name: "AboutView",
  components: {
    Github,
  },
});
</script>
