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

    <router-link :to="{name: 'categories', params: {id: category.id}}" class="card bg-dark text-white m-3">
        <img :src="getImagePath(category.image)"  class="card-img category-card opacity-50" style="object-fit: cover;">

        <div class="card-img-overlay">
            <h5 class="text-center mt-5 category-text ">{{ category.name }}</h5>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
.category-card {
    height: 150px; 
    background-size: cover; 
    background-position: center; 
}
  
.category-text{
    color: $primary-green;

    &:hover{
        z-index: 999;
        font-size: 2rem;
    }
}

</style>