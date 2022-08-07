<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      msg: "this is register",
      form: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["Register"]),
    submit() {
      this.Register(this.form);
    },
  },
  computed: {
    ...mapState(["registerErrorMsg"]),
    active() {
      return {
        name: this.registerErrorMsg && this.registerErrorMsg.name,
        password: this.registerErrorMsg && this.registerErrorMsg.password,
      };
    },
  },
};
</script>

<template>
  <div class="bg-gray-100 shadow-lg mt-10 w-7/12 mx-auto p-5 max-w-2xl">
    <div class="text-center text-3xl mb-5">Register</div>
    <form @submit.prevent="submit">
      <div class="mb-3 w-2/3 mx-auto">
        <label class="text-xl block px-1 py-2" for="name"> name: </label>
        <input
          class="w-full rounded p-1 text-xl"
          :class="{ 'border border-red-600': active.name }"
          type="text"
          id="name"
          v-model="form.name"
          placeholder="name"
        />
        <p
          class="text-red-600 mt-1"
          v-if="registerErrorMsg && registerErrorMsg.name"
        >
          {{ registerErrorMsg.name }}
        </p>
      </div>
      <div class="mb-3 w-2/3 mx-auto">
        <label class="text-xl block px-1 py-2" for="password">
          password:
        </label>
        <input
          class="w-full rounded p-1 text-xl"
          :class="{ 'border border-red-600': active.password }"
          type="password"
          id="password"
          v-model="form.password"
          placeholder="password"
        />
        <p
          class="text-red-600 mt-1"
          v-if="registerErrorMsg && registerErrorMsg.password"
        >
          {{ registerErrorMsg.password }}
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
