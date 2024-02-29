import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import SingleRestaurantPage from "./pages/SingleRestaurantPage.vue";
import RestaurantsPage from "./pages/RestaurantsPage.vue";
import CheckoutPage from "./pages/CheckoutPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

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
      component: SingleRestaurantPage,
    },
    {
      path: "/restaurants",
      name: "restaurants",
      component: RestaurantsPage,
    },
    {
      path: "/restaurants/:id",
      name: "categories",
      component: RestaurantsPage,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutPage,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundPage,
    },
  ],
});

export { router };
