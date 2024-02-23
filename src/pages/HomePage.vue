<script>

import AppHeaderVue from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
export default {
  data(){
        
    },
  components: {AppHeaderVue,AppFooter }
};
  
</script>

<template>
<AppHeaderVue />
<AppFooter/>


import axios from 'axios';
import CategoryCard from '../components/CategoryCard.vue';
import { store } from '../store';
import AppMobile from '../components/AppMobile.vue';

export default {
  data() {
    return {
      store,
      categories: []
    }
  },

  created() {
  //chiamata axios
    axios.get(`${this.store.baseUrl}/api/categories`)
      .then((resp) => {
        //console.log(resp);
        this.categories = resp.data.results;
      })
      
  },

  components: { CategoryCard, AppMobile },
};
</script>

<template>
  <div class="container">
    <h3 class="text-center">CATEGORIES:</h3>
    <div class="row row-cols-4">
      <div class="col" v-for="category in categories" :key="category.id">
        <!-- component category card -->
        <CategoryCard :category="category" />
      </div>
      
    </div>
    
  </div>
  <AppMobile/>

</template>

<style lang="scss" scoped></style>
