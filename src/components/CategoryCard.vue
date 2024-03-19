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
    
     <router-link :to="{ name: 'categories', params: { id: category.id } }" class="text-decoration-none">
        <div class="card mt-5 border-0" style="width: 10rem; border-radius: 30px;">
            <div class="card-img-top" style="height: 10rem;">
                <img :src="getImagePath(category.image)" style="object-fit: cover; max-height: 100%; width: 100%; border-top-left-radius: 30px; border-top-right-radius: 30px;">
            </div>
            
            <div class="card-body" style="height: 60px;">
            <h3 class="text-center _my-text">{{ category.name }}</h3>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;

._my-text{
    margin-bottom: 0;
}

.card{
    transition: all 0.5s;
    &:hover{
        background-color: $primary-green;
        transform: scale(1.1);
    }
}

</style>