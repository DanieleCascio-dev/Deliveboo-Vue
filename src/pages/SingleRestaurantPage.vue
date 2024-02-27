<script>
import axios from "axios";
import { store } from "../store";

export default {
  data() {
    return {
      store,
      curRestaurant: null,
      loading: false,
      totPrice: null,
      storageMeal: [],
      restaurantSlug: "",
    };
  },
  methods: {
    addToTotal() {
      this.storageMeal.forEach((meal) => {
        this.totPrice += meal.price * meal.quantity;
      });
    },
    addToCart(meal) {
      if (localStorage.getItem(meal.name)) {
        let dish = JSON.parse(localStorage.getItem(meal.name)).quantity;
        console.log(dish);
        localStorage.setItem(
          meal.name,
          JSON.stringify({
            name: meal.name,
            image: meal.image,
            description: meal.description,
            price: parseFloat(meal.price),
            quantity: dish + 1,
            restaurant_id: meal.restaurant_id,
          })
        );
        this.showStorage();
      } else {
        localStorage.setItem(
          meal.name,
          JSON.stringify({
            name: meal.name,
            image: meal.image,
            description: meal.description,
            price: parseFloat(meal.price),
            quantity: 1,
            restaurant_id: meal.restaurant_id,
          })
        );
      }
      this.showStorage();
    },
    /* total() {
      return (this.totPrice =
        JSON.parse(localStorage.getItem("totPrice")) ?? 0);
    }, */
    clear() {
      localStorage.clear();
      this.showStorage();
    },
    showStorage() {
      this.storageMeal = [];
      Object.keys(localStorage).forEach((key) => {
        this.storageMeal.push(JSON.parse(localStorage.getItem(key)));
      });
      this.totPrice = 0;
      this.addToTotal();
    },
  },
  created() {
    this.loading = true;
    axios
      .get(`${this.store.baseUrl}/api/restaurants/${this.$route.params.slug}`)
      .then((resp) => {
        if (resp.data.success) {
          this.curRestaurant = resp.data.results;
        } else {
          this.$router.push({ name: "not-found" });
        }
      })
      .finally(() => {
        this.loading = false;
        if (localStorage) {
          Object.keys(localStorage).forEach((key) => {
            const product = JSON.parse(localStorage.getItem(key));
            if (product.restaurant_id != this.curRestaurant.id) {
              this.clear();
            } else {
              this.showStorage();
            }
          });
        }
      });
  },
};
</script>

<template>
  <div class="container">
    <div v-if="loading">
      <h3 class="text-center">Loading...</h3>
    </div>
    <div v-else>
      <img src="../assets/pizza margherita.jpg" alt="" />
      <h2>{{ curRestaurant.name }}</h2>
      <p>{{ curRestaurant.address }}</p>
      <div class="d-flex">
        <div>
          <h4>Menu</h4>
          <ul v-for="meal in curRestaurant.meals" :key="meal.id">
            <li>{{ meal.name }}</li>
            <li><img :src="meal.image" alt="" /></li>
            <li>
              <p>{{ meal.description }}</p>
            </li>
            <li>
              <p>{{ meal.price }}</p>
            </li>
            <li>
              <button class="btn btn-success" @click="addToCart(meal)">
                Buy
              </button>
            </li>
          </ul>
        </div>
        <div class="cart">
          <ul>
            <li v-for="product in storageMeal">
              <h4>Name: {{ product.name }}</h4>
              <p>Price: {{ product.price }}</p>
              <p>Quantity: {{ product.quantity }}</p>
            </li>
          </ul>
          <h4>Tot: {{ totPrice }}</h4>
          <button class="btn btn-danger" @click="clear()">Clear</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 200px;
}
</style>
