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

      <div class="row row-cols-4">
        <!-- category card -->
          <div v-for="(category, index) in categories" :key="category.id" class="col">
            <CategoryCard :category="category" />
          </div>
      </div>
       
    
    </div>    
    <AppMobile />
  </div> 
</template>


<style lang="scss" scoped>
@use "../style/partials/variables" as *;
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

.my-slide {
  width: 75%;
  margin: auto;

}

/* Media query (sm) */
@media (max-width: 575px) {
  .carousel-inner {
    width: 80%; 
    height: 160px;
    margin: auto;
  }
}

/* Media query (md) */
@media (min-width: 576px) and (max-width: 767px) {
  .carousel-inner {
    width: 80%; 
    border-radius: 80%;
    margin: auto;
  }
}

/* Media query (lg) */
@media (min-width: 768px) and (max-width: 991px) {
  .carousel-inner {
    width: 60%; 
    border-radius: 80%;
    margin: auto;
  }
}

</style>
 