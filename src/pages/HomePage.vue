<script>
import axios from "axios";
import { store } from "../store";
import CategoryCard from "../components/CategoryCard.vue";
import AppMobile from "../components/AppMobile.vue";
import HomeHero from "../components/HomeHero.vue";
export default {
  data() {
    return {
      store,
      categories: [],
    };
  },
  created() {
    //chiamata axios
    axios.get(`${this.store.baseUrl}/api/categories`).then((resp) => {
      this.categories = resp.data.results;
    });

  },
  components: { CategoryCard, AppMobile, HomeHero },
};
</script>

<template>
  <HomeHero />
  <div class="container">
    <h3 class="text-center">CATEGORIES:</h3>
    <div class="row row-cols-4">
      <div class="col" v-for="category in categories" :key="category.id">

        <!-- component category card -->

        <CategoryCard :category="category" />
      </div>
    </div>
  </div>

  <AppMobile />
</template>

<style lang="scss" scoped></style>
