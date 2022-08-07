import { createRouter, createWebHashHistory } from "vue-router";
import About from "./pages/About.vue";
import Home from "./pages/Home.vue";
import LoginVue from "./pages/Login.vue";
import NewPostVue from "./pages/NewPost.vue";
import PostVue from "./pages/Post.vue";
import Register from "./pages/Register.vue";
import EditPostVue from "./pages/EditPost.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/login", component: LoginVue },
  { path: "/register", component: Register },
  { path: "/post/new", component: NewPostVue },
  { path: "/post/edit/:id", name: "Edit", component: EditPostVue },
  { path: "/post/:id", name: "Post", component: PostVue },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
