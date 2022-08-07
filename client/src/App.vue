<script>
import { mapMutations } from "vuex";
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar },
  methods: {
    ...mapMutations(["loginUser"]),
  },
  created() {
    this.loginUser();
  },
};
</script>

<template>
  <div class="bg-gray-50 h-screen">
    <Navbar />

    <router-view></router-view>
  </div>
</template>

<style></style>
