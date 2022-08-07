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
    ...mapActions(["createNewPost"]),
    submit() {
      this.createNewPost(this.form);
    },
  },
  computed: {
    ...mapState(["newPostErrorMsg"]),
    active() {
      return {
        title: this.newPostErrorMsg && this.newPostErrorMsg.title,
        body: this.newPostErrorMsg && this.newPostErrorMsg.body,
      };
    },
  },
};
</script>

<template>
  <div class="bg-gray-100 shadow-lg mt-10 w-7/12 mx-auto p-5 max-w-2xl">
    <div class="text-center text-3xl mb-5">New Post</div>
    <form @submit.prevent="submit">
      <div class="mb-3 w-2/3 mx-auto">
        <label class="text-xl block px-1 py-2" for="title"> Title: </label>
        <input
          class="w-full rounded p-1 text-xl"
          :class="{ 'border border-red-600': active.title }"
          type="text"
          id="title"
          v-model="form.title"
          placeholder="Title"
        />
        <p
          class="text-red-600 mt-1"
          v-if="newPostErrorMsg && newPostErrorMsg.title"
        >
          {{ newPostErrorMsg.title }}
        </p>
      </div>
      <div class="mb-3 w-2/3 mx-auto">
        <label class="text-xl block px-1 py-2" for="body"> Post: </label>
        <textarea
          class="w-full rounded p-1 text-xl"
          :class="{ 'border border-red-600': active.body }"
          type="body"
          id="body"
          v-model="form.body"
          placeholder="post..."
        />
        <p
          class="text-red-600 mt-1"
          v-if="newPostErrorMsg && newPostErrorMsg.body"
        >
          {{ newPostErrorMsg.body }}
        </p>
      </div>
      <div class="mb-3 w-2/3 mx-auto">
        <button
          class="text-xl block w-full bg-purple-500 rounded p-1 transition-all hover:bg-purple-700"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
