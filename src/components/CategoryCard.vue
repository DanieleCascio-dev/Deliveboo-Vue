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
    <router-link :to="{ name: 'categories', params: { id: category.id } }" class="d-block w-100">
        <img :src="getImagePath(category.image)" class="category-card opacity-50 d-block w-100" style="object-fit: cover;">

        <div class="carousel-caption d-none d-md-block">
            <h3 class="text-center category-text ">{{ category.name }}</h3>
        </div>
    </router-link>

    <!--bottoni per scorrere slide-->
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Precedente</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Successivo</span>
    </button>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;

.category-card {
    height: 300px;
    background-size: cover;
    background-position: center;
}

.category-text {
    color: $primary-green;
    padding-bottom: 5rem;
}
</style>