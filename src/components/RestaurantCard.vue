<script>
import { store } from '../store';

export default {
  props: {
    restaurant: Object,
  },
  data() {
    return {
      store,
    };
  },
};
</script>
<template>
  <div class="my-card">
    <img
      v-if="restaurant.image"
      :src="
        restaurant.image.includes('http')
          ? restaurant.image
          : `${store.baseUrl}/storage/${restaurant.image}`
      "
      alt=""
    />
    <img
      v-else
      src="https://www.marcobianchi.blog/wp-content/uploads/2023/01/pizza-scaled.jpg"
      alt=""
    />
    <div class="content">
      <h3>{{ restaurant.name }}</h3>
      <p>
        Categories:
        <em v-for="(category, i) in restaurant.categories"
          >{{ category.name
          }}<span v-if="restaurant.categories.length == i + 1">.</span
          ><span v-else>, </span></em
        >
      </p>
      <p>{{ restaurant.phone }}</p>
      <p>{{ restaurant.address }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;

.my-card {
  @media screen and (max-width: 767px) {
    img {
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      object-fit: cover;
    }

    .content {
      background-color: $primary-violet;
      color: white;
      padding: 0.5rem 1rem;
      width: 100%;
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }

  @include response("md") {
    display: flex;
    flex-direction: row;

    img {
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
      object-fit: cover;
      width: 25%;
    }

    .content {
      background-color: $primary-violet;
      color: white;
      padding: 0.5rem 1rem;
      width: 100%;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }
}
</style>
