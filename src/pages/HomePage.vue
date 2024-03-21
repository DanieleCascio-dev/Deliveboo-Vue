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
      loading: false,
    };
  },
  created() {
    //chiamata axios
    this.loading = true;
    axios.get(`${this.store.baseUrl}/api/categories`)
    .then((resp) => {
      this.categories = resp.data.results;
    })
    .finally(() => {
          this.loading = false;
    });

  },
  components: { CategoryCard, AppMobile, HomeHero },
};
</script>

<template>
  <div v-if="loading">
      <div id="preloader"></div>
  </div>
  <div v-else>
    <HomeHero />
    <div class="wrapper my-background pb-5">
      <h2 class="text-center pb-3">CATEGORIES:</h2>

      <div class="container">
      <div class="row row-cols-lg-4 flex-nowrap overflow-x-auto overflow-hidden flex-lg-wrap">
        <!-- category card -->
          <div v-for="(category, index) in categories" :key="category.id" class=" _my-category-card col d-flex align-items-center justify-content-center mb-3">
              <CategoryCard :category="category" />
          </div>
      </div>
      </div>
    </div>    
    <AppMobile />
  </div> 
</template>


<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;

.row::-webkit-scrollbar {
  background-color: transparent; 
}

.row::-webkit-scrollbar-thumb {
  background-color: $primary-green; 
  border-radius: 10px; 
}

#preloader{
  background: $primary-green url('../assets/loading.gif') no-repeat center center;
  height: 100%;
  width:100%;
  position: fixed;
  top:0px;
  z-index: 100;
}

.my-background {
  background-color: $primary-violet ;
}

h2 {
  color: $primary-green;
}

</style>
 