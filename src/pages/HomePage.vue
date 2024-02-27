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
  <div class="wrapper my-background p-5">
    <h2 class="text-center p-3">CATEGORIES:</h2>

    <!--carosello-->
    <div class="carousel slide my-slide" data-bs-ride="carousel" id="carouselExampleCaptions">
      <div class="carousel-inner rounded-2">
        <div v-for="(category, index) in categories" :key="category.id">
          <div :class="['carousel-item', { 'active': index === 0 }]">
            <CategoryCard :category="category" />
          </div>
        </div>
      </div>
    </div>

  </div>

  <AppMobile />
</template>


<style lang="scss" scoped>
@use "../style/partials/variables" as *;

.my-background {
  background-color: $primary-violet ;
}

h2 {
  color: $primary-green;
}

.my-slide {
  width: 60rem;
  margin: 0 auto;
}

/* Media query (sm) */
@media (max-width: 575px) {
  .carousel-inner {
    width: 50%; 
  }
}

/* Media query (md) */
@media (min-width: 576px) and (max-width: 767px) {
  .carousel-inner {
    width: 50%; 
    border-radius: 80%;
  }
}

/* Media query (lg) */
@media (min-width: 768px) and (max-width: 991px) {
  .carousel-inner {
    width: 50%; 
    border-radius: 80%;
  }
}

</style>
 