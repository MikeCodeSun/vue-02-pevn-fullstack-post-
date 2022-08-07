<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["Login"]),
    submit() {
      this.Login(this.form);
    },
  },
  computed: {
    ...mapState(["loginErrorMsg"]),
    active() {
      return {
        name: this.loginErrorMsg && this.loginErrorMsg.name,
        password: this.loginErrorMsg && this.loginErrorMsg.password,
      };
    },
  },
};
</script>

<template>
  <div class="bg-gray-100 shadow-lg mt-10 w-7/12 mx-auto p-5 max-w-2xl">
    <div class="text-center text-3xl mb-5">登陆</div>
    <form @submit.prevent="submit">
      <div class="mb-3 w-2/3 mx-auto">
        <label for="name" class="text-xl block px-1 py-2">账号: </label>

        <input
          class="w-full rounded p-1 text-xl"
          :class="{ 'border-red-600 border': active.name }"
          id="name"
          type="text"
          placeholder="name"
          v-model="form.name"
        />
        <p class="text-red-600 mt-1" v-if="loginErrorMsg && loginErrorMsg.name">
          {{ loginErrorMsg.name }}
        </p>
      </div>
      <div class="mb-3 w-2/3 mx-auto">
        <label class="block px-1 py-2 text-xl" for="password">密码: </label>
        <input
          class="w-full rounded p-1 text-xl"
          :class="{ 'border-red-600 border': active.password }"
          id="password"
          type="password"
          v-model="form.password"
          placeholder="password"
        />
        <p
          class="text-red-600 mt-1"
          v-if="loginErrorMsg && loginErrorMsg.password"
        >
          {{ loginErrorMsg.password }}
        </p>
      </div>

      <div class="mb-3 w-2/3 mx-auto">
        <button
          class="text-xl block w-full bg-purple-500 rounded p-1 transition-colors hover:bg-purple-700"
        >
          提交
        </button>
      </div>
    </form>
  </div>
</template>
