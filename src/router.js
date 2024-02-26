import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import SingleRestaurantPage from "./pages/SingleRestaurantPage.vue";
import RestaurantsPage from "./pages/RestaurantsPage.vue";

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

      path: "/restaurants",
      name: "restaurants",
      component: RestaurantsPage,
    },
    {
      path: "/restaurants/:id",
      name: 'categories',
      component: RestaurantsPage
    }

  ],
});

export { router };
