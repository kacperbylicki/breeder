import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store";

const routes = [
  {
    path: "/",
    name: "Board",
    component: () => import(/* webpackChunkName: "board" */ "../views/Board.vue"),
    meta: {
      requiresAuth: true,
      requiresProfileSetup: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    meta: {
      requiresAuth: true,
      requiresProfileSetup: true,
    },
  },
  {
    path: "/setup-profile",
    name: "SetupProfile",
    component: () => import(/* webpackChunkName: "setupProfile" */ "../views/ProfileSetup.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/matches",
    name: "Matches",
    component: () => import(/* webpackChunkName: "matches" */ "../views/Matches.vue"),
    meta: {
      requiresAuth: true,
      requiresProfileSetup: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (to.matched.some((record) => record?.meta?.requiresAuth) && !store.getters.isAuthenticated) {
    await router.push({ name: "Login" });
  }

  if (
    !to.matched.some((record) => record?.meta?.requiresAuth) &&
    store.getters.isAuthenticated &&
    store.getters.profile !== null
  ) {
    await router.push({ name: "Board" });
  }

  if (
    to.matched.some((record) => record?.meta?.requiresAuth) &&
    to.matched.some((record) => record?.meta?.requiresProfileSetup) &&
    store.getters.isAuthenticated &&
    store.getters.profile === null
  ) {
    await router.push({ name: "SetupProfile" });
  }
});
