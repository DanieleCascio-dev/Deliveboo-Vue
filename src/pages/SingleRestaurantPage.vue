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
      showModal: false,
      currMeal: {},
      currProd: {},
    };
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
        this.showStorage();
      });
  },
  methods: {
    /************************************************************ADD TO LOCAL STORAGE AND SHOW */
    checkRestaurant(meal) {
      if (localStorage.length > 0) {
        console.log("non è vuoto");
        console.log(localStorage.length);

        Object.keys(localStorage).forEach((key) => {
          this.currProd = JSON.parse(localStorage.getItem(key));
        });

        if (this.currProd.restaurant_id != this.curRestaurant.id) {
          this.displayModal(meal);
        } else {
          /* console.log("sei nello stesso ristorante"); */
          this.addToCart(meal);
        }
      } else {
        /* console.log("è vuoto"); */
        this.addToCart(meal);
      }
    },
    addToCart(meal) {
      if (localStorage.getItem(meal.name)) {
        let dish = 0;
        console.log(dish, "lo setto a 0");
        dish = JSON.parse(localStorage.getItem(meal.name)).quantity;
        console.log(dish, meal.name, "lo setto alla quantità del piatto");

        localStorage.setItem(
          meal.name,
          JSON.stringify({
            id: meal.id,
            name: meal.name,
            image: meal.image,
            description: meal.description,
            price: parseFloat(meal.price),
            quantity: dish + 1,
            restaurant_id: meal.restaurant_id,
            restaurant:
              meal.restaurant_id == this.curRestaurant.id
                ? this.curRestaurant.name
                : "",
          })
        );
      } else {
        localStorage.setItem(
          meal.name,
          JSON.stringify({
            id: meal.id,
            name: meal.name,
            image: meal.image,
            description: meal.description,
            price: parseFloat(meal.price),
            quantity: 1,
            restaurant_id: meal.restaurant_id,
            restaurant:
              meal.restaurant_id == this.curRestaurant.id
                ? this.curRestaurant.name
                : "",
          })
        );
      }
      this.showStorage();
    },
    /* ******************************************************************* */
    /* ***************************************************MODAL */
    displayModal(meal) {
      this.showModal = true;
      this.currMeal = meal;
      console.log(this.currMeal);
    },
    hideModal() {
      this.showModal = false;
    },
    /* **************************************************** */
    /*********************************** CLEAR LOCAL STORAGE, CLEAR AND ADD, SHOW STPRAGE */
    clear() {
      localStorage.clear();
      this.showStorage();
    },
    clearAndAdd() {
      this.clear();
      this.addToCart(this.currMeal);
      this.hideModal();
    },
    showStorage() {
      console.log("sono nello showStorage");
      this.storageMeal = [];
      Object.keys(localStorage).forEach((key) => {
        this.storageMeal.push(JSON.parse(localStorage.getItem(key)));
      });
      this.totPrice = 0;
      this.addToTotal();
      return;
    },
    removeMeal(meal) {
      console.log("funzione removeMeal");
      // meal.name = Diavola       key:Diavola = {name:Diavola, description: .....}
      if (meal.name === JSON.parse(localStorage.getItem(meal.name)).name) {
        // Se il piatto ha una quantità maggiore di 1 allora la diminuisco di 1
        const quantity = JSON.parse(localStorage.getItem(meal.name)).quantity;
        if (quantity > 1) {
          console.log("secondo if");
          let dish = JSON.parse(localStorage.getItem(meal.name)).quantity;
          localStorage.setItem(
            meal.name,
            JSON.stringify({
              id: meal.id,
              name: meal.name,
              image: meal.image,
              description: meal.description,
              price: parseFloat(meal.price),
              quantity: dish - 1,
              restaurant_id: meal.restaurant_id,
              restaurant:
                meal.restaurant_id == this.curRestaurant.id
                  ? this.curRestaurant.name
                  : "",
            })
          );
          this.showStorage();
        }
        //Altrimenti elimino il piatto
        else {
          console.log("secondo else");
          localStorage.removeItem(meal.name);
          this.showStorage();
        }
      } else {
        console.log("non c'è");
      }
    },
    /* ************************************************************************ */
    addToTotal() {
      console.log("aggiorno il prezzo");
      this.storageMeal.forEach((meal) => {
        this.totPrice += meal.price * meal.quantity;
      });
      return;
    },
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
              <p>{{ meal.is_active ? "Available" : "Not Available" }}</p>
            </li>
            <li>
              <button
                class="btn btn-success"
                :disabled="!meal.is_active"
                @click="checkRestaurant(meal)"
              >
                Buy
              </button>
            </li>
          </ul>
        </div>
        <!-- ******************************* CART ************************ -->
        <div class="cart">
          <ul>
            <li v-for="product in storageMeal">
              <h4>
                Name: {{ product.name }}
                <span
                  ><button class="btn btn-danger" @click="removeMeal(product)">
                    X
                  </button></span
                >
              </h4>

              <p>Price: {{ product.price }}</p>
              <p>Quantity: {{ product.quantity }}</p>
              <p>
                <strong>Restaurant: </strong>
                {{ product.restaurant }}
              </p>
            </li>
          </ul>
          <h4>Tot: {{ totPrice }}</h4>
          <button class="btn btn-danger" @click="clear()">Clear</button>
        </div>
        <!-- ****************************** END CART ********************* -->
      </div>
    </div>
  </div>
  <!-- MODAL -->
  <div class="_fixed _modal" :class="{ 'd-none': showModal == false }">
    <h3>
      Wait! You are in another restaurant! Before adding new meals to your order
      you have to clear your cart.
    </h3>
    <button class="btn btn-warning" @click="clearAndAdd">Clear cart</button>
    <button class="btn btn-success" @click="hideModal">Don't buy</button>
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 200px;
}
ul {
  list-style-type: none;
}

._fixed {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
._modal {
  background-color: rgba(128, 128, 128, 0.591);
}
</style>
