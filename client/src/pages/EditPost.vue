<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    ...mapActions(["editPost"]),
    submit() {
      this.editPost({ id: this.$route.params.id, post: this.form });
    },
  },
  computed: {
    ...mapState(["post"]),

    submitActive() {
      return (
        this.form.title &&
        this.form.title.trim() !== "" &&
        this.form.body &&
        this.form.body.trim() !== ""
      );
    },
  },
  created() {
    console.log(this.post);
  },
};
</script>

<template>
  <div class="bg-gray-100 shadow-lg mt-10 w-7/12 mx-auto p-5 max-w-2xl">
    <div class="text-center text-3xl mb-5">Edit Post</div>
    <form @submit.prevent="submit">
      <div class="mb-3 w-2/3 mx-auto">
        <label class="text-xl block px-1 py-2" for="title"> Title: </label>
        <input
          class="w-full rounded p-1 text-xl"
          type="text"
          id="title"
          v-model="form.title"
          :placeholder="post.title"
        />
      </div>
      <div class="mb-3 w-2/3 mx-auto">
        <label class="text-xl block px-1 py-2" for="body"> Post: </label>
        <textarea
          class="w-full rounded p-1 text-xl"
          type="body"
          id="body"
          v-model="form.body"
          :placeholder="post.body"
        />
      </div>
      <div class="mb-3 w-2/3 mx-auto">
        <button
          class="text-xl block w-full bg-purple-500 rounded p-1 transition-all hover:bg-purple-700"
          type="submit"
          :class="{ 'cursor-not-allowed': !submitActive }"
          :disabled="!submitActive"
        >
          Submit >
        </button>
      </div>
    </form>
  </div>
</template>
