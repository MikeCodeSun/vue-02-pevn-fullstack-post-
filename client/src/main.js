import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import store from "./store";
import "./main.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/api/v1/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common = {
  Authorization: "Bearer " + localStorage.getItem("token"),
};

createApp(App).use(store).use(router).mount("#app");
