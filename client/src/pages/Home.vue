<script>
import Posts from "../components/Posts.vue";
export default {
  data() {
    return {
      msg: this.$store.state.msg,
    };
  },

  components: {
    Posts,
  },
};
</script>

<template>
  <div>
    <Posts />
  </div>
</template>
