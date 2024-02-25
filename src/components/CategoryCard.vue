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
   
}

</script>

<template>
            <div class="card m-3">
                <img src="" class="card-img-top">
                <h5 class="text-center">{{ category.name }}</h5>
            </div>
</template>

<style lang="scss" scoped></style>