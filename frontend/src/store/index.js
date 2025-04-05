import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    events: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async fetchEvents({ commit }) {
      const { data } = await axios.get("/api/events");
      commit("setEvents", data);
    },
    async login({ commit }, credentials) {
      const { data } = await axios.post("/api/auth/login", credentials);
      commit("setUser", data.user);
      localStorage.setItem("token", data.token);
    },
    async register({ commit }, userInfo) {
      const { data } = await axios.post("/api/auth/register", userInfo);
      commit("setUser", data.user);
      localStorage.setItem("token", data.token);
    },
    logout({ commit }) {
      commit("setUser", null);
      localStorage.removeItem("token");
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setEvents(state, events) {
      state.events = events;
    },
  },
});
