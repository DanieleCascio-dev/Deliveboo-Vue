import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import SingleRestaurantPage from "./pages/SingleRestaurantPage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/restaurant/:slug",
      name: "single-restaurant",
      component: SingleRestaurantPage
    },
  ],
});

export { router };
