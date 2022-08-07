import { createStore } from "vuex";
import axios from "axios";
import router from "./route";
import jwt_decode from "jwt-decode";

const store = createStore({
  state() {
    return {
      loginErrorMsg: null,
      registerErrorMsg: null,
      newPostErrorMsg: null,
      user: null,
      posts: [],
      post: null,
    };
  },
  actions: {
    async Login({ state, commit }, form) {
      try {
        const res = await axios.post("user/login", form);
        // console.log(res.data);
        localStorage.setItem("token", res.data.token);
        commit("loginUser");
        // router.push("/");
        //  login need to refresh page ,load token
        window.location.href = "/";
      } catch (error) {
        console.log(error.response.data);
        state.loginErrorMsg = error.response.data;
      }
    },
    async Register({ state }, form) {
      try {
        const res = await axios.post("user/register", form);
        console.log(res.data);

        router.push("/login");
      } catch (error) {
        console.log(error.response.data);
        state.registerErrorMsg = error.response.data;
      }
    },
    async getAllPosts({ state }) {
      try {
        const res = await axios.get("post");
        // console.log(res.data);
        state.posts = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getPost({ state }, id) {
      try {
        const res = await axios.get(`/post/${id}`);
        // console.log(res.data);
        state.post = res.data.post;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePost({ state }, id) {
      console.log(id);
      try {
        const res = await axios.delete(`/post/${id}`);
        console.log(res);
        state.posts = state.posts.filter((post) => post.id != id);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async createNewPost({ state }, post) {
      try {
        const res = await axios.post("post", post);
        // console.log(res);
        state.posts = [res.data.post, ...state.posts];
        router.push("/");
      } catch (error) {
        console.log(error);
        state.newPostErrorMsg = error.response.data;
      }
    },
    // edit post
    async editPost({ state }, { id, post }) {
      try {
        const res = await axios.patch(`/post/${id}`, post);
        console.log(res);
        state.posts = state.posts.map((item) => {
          if (item.id === id) {
            item.title = post.title;
            item.body = post.body;
          }
          return item;
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    loginUser(state) {
      const token = localStorage.getItem("token");
      if (token) {
        const decode = jwt_decode(token);
        if (decode.exp * 1000 > Date.now()) {
          state.user = decode;
          // console.log(decode);
        } else {
          localStorage.removeItem("token");
        }
      }
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  getters: {},
});

export default store;
