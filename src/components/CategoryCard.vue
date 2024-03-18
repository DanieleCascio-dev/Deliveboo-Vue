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

            return new URL(`../assets/img/${imageName}`, import.meta.url).href;
        },
    }
}

</script>

<template>
    <div class="card" style="width: 10rem; height: 10rem;">
   <div class="m-auto">
        <router-link :to="{ name: 'categories', params: { id: category.id } }" class="d-flex justify-content-center">
            <img :src="getImagePath(category.image)" class="card-img-top">

            <!--<div>
                <h3 class="text-center category-text m-auto ">{{ category.name }}</h3>
            </div>-->
        </router-link>
    </div> 
    </div>

</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;

img{
    min-width: 400px;

    @include response("md") {
            min-width: 100%;
    }
    @include response("l") {
            min-width: 100%;
    }
}
.category-card {
    height: 300px;
    background-size: cover;
    background-position: center;
}

.category-text {
    color: $primary-violet;
    padding: 5px;
    background-color: $bg-category-carousel;
    width: 140px;
    position: relative;
    bottom: 150px;
    left: 0;
    font-size: 30px;

    @include response("md"){
        position: relative;
        left: 0;
        bottom: 80px;
    }
    @include response("l"){
        position: relative;
        left: 0;
        bottom: 80px;
    }
}

</style>