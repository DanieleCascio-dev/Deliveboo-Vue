<script>
import { store } from '../store';

export default {
    props: {
        category: Object,
    },

    data() {
        return {
            store
        }
    },

    methods: {
    getImagePath(imageName) {
    
      return new URL (`../assets/img/${imageName}`, import.meta.url).href;
    },
}
}

</script>

<template>
    <router-link to="/restaurants" class="card bg-dark text-white m-3"  v-if="category.image">
        <img :src="getImagePath(category.image)"  class="card-img category-card opacity-50" style="object-fit: cover;">
        <div class="card-img-overlay">
            <h5 class="text-center mt-5 category-card-text ">{{ category.name }}</h5>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
.category-card {
    height: 150px; 
    background-size: cover; 
    background-position: center; 
}
  :hover{
   opacity: 45%;
  }

  //NON FUNZIONA HOVER SU SCRITTA
.category-card-text{
    color: red;
}
   .hover{
      color: greenyellow;
   }

</style>