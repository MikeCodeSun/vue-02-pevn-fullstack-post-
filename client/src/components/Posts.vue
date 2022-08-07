<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["getAllPosts"]),
  },
  computed: {
    ...mapState(["posts"]),
  },
  created() {
    this.getAllPosts();
  },
};
</script>

<template>
  <main>
    <div v-if="posts.length !== 0" class="sm:w-1/2 mx-auto mt-5 w-11/12">
      <router-link
        v-for="post in posts"
        :key="post.id"
        :to="{ name: 'Post', params: { id: post.id } }"
        class="flex items-center bg-gray-100 shadow my-2 p-1 capitalize cursor-pointer hover:bg-gray-200"
      >
        <div class="text-2xl">{{ post.username }}:</div>
        <div class="ml-3">
          <h4 class="text-xl">{{ post.title }}</h4>
        </div>
      </router-link>
    </div>

    <div v-else class="text-center mt-5 text-3xl">No Posts</div>
  </main>
</template>
