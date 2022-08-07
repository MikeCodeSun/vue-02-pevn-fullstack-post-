<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      msg: "this navbar",
    };
  },
  methods: {
    ...mapMutations(["logoutUser"]),
    toggleMenu() {
      const menu = document.getElementById("menu");
      // console.log(menu);
      menu.classList.toggle("show-menu");
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<template>
  <!-- nav -->
  <nav class="bg-gray-100 opacity-50 shadow">
    <!-- nav center -->
    <div class="w-9/12 mx-auto flex justify-between p-3 flex-col sm:flex-row">
      <!-- nav logo & nav toggle menu btn -->
      <div class="flex justify-between w-full">
        <router-link to="/" class="text-2xl hover:text-gray-600"
          >Logo</router-link
        >
        <button
          class="block sm:hidden text-purple-500 text-lg hover:text-purple-700"
          @click="toggleMenu"
        >
          Menu
        </button>
      </div>
      <!-- nav menu -->
      <div
        class="items-center text-center transition-all hidden flex-col sm:flex sm:flex-row"
        id="menu"
      >
        <router-link to="/" class="mx-1 p-2 hover:text-gray-700"
          >Home</router-link
        >
        <router-link to="/about" class="mx-1 p-2 hover:text-gray-700"
          >About</router-link
        >
        <div v-if="!user" class="sm:flex">
          <router-link
            to="/login"
            class="mx-1 p-2 hover:text-gray-700 capitalize"
            >login</router-link
          >
          <router-link
            to="/register"
            class="mx-1 p-2 block hover:text-gray-700 capitalize"
            >register</router-link
          >
        </div>
        <div v-else class="sm:flex">
          <router-link
            to="/post/new"
            class="mx-1 p-2 hover:text-gray-700 capitalize userPost"
            >{{ user.name }}</router-link
          >
          <router-link
            to="#"
            class="mx-1 p-2 block hover:text-gray-700 capitalize"
            @click="logoutUser"
            >logout</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.show-menu {
  display: flex;
}
.userPost {
  position: relative;
}
.userPost::after {
  content: "new post";
  position: absolute;
  top: 120%;
  left: 50%;
  width: 200%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  display: none;
}
.userPost:hover::after {
  display: block;
}
</style>
