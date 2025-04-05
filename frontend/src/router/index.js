import { createRouter, createWebHistory } from "vue-router";
import Events from "@/pages/Events.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

const routes = [
  { path: "/", component: Events },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
