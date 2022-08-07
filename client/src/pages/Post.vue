<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["post", "user"]),
  },
  methods: {
    ...mapActions(["getPost", "deletePost"]),
    editPost() {
      this.$router.push(`/post/edit/${this.$route.params.id}`);
    },
  },
  created() {
    this.getPost(this.$route.params.id);
  },
};
</script>

<template>
  <div>
    <div
      v-if="post"
      class="md:w-2/5 mx-auto mt-5 w-8/12 bg-gray-100 shadow p-2 rounded"
    >
      <router-link to="/" class="hover:text-gray-500 text-xl mb-2 underline"
        >Back to Home</router-link
      >
      <div class="capitalize text-4xl mb-2">{{ post.username }}</div>
      <div class="capitalize text-3xl mb-2">{{ post.title }}</div>
      <div class="capitalize text-xl mb-2">{{ post.body }}</div>
      <div class="capitalize mb-2">{{ post.created_at }}</div>
      <div class="flex justify-evenly">
        <button
          class="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-700"
          @click="deletePost(post.id)"
          v-if="post.username === user?.name"
        >
          Delete
        </button>
        <button
          class="bg-yellow-500 px-2 py-1 rounded text-white hover:bg-yellow-700"
          v-if="post.username === user?.name"
          @click="editPost"
        >
          Edit
        </button>
      </div>
    </div>
    <div v-else class="text-center mt-5 text-3xl">No post</div>
  </div>
</template>
