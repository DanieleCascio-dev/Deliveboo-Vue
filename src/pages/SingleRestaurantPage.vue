<script>
import axios from "axios";
import { store } from "../store";
export default {
  data() {
    return {
      store,
      curRestaurant: "",
      loading: false,
      totPrice: 0,
      storageMeal: [],
      restaurantSlug: "",
      showModal: false,
      currMeal: {},
      currProd: {},
      totQuantity: 0,
      isCartOpen: false,
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
      this.totQuantity = 0;
      Object.keys(localStorage).forEach((key) => {
        this.storageMeal.push(JSON.parse(localStorage.getItem(key)));
        this.totQuantity += JSON.parse(localStorage.getItem(key)).quantity;
      });
      this.totPrice = 0;
      this.addToTotal();
      return;
    },
    removeMeal(meal) {
      console.log("funzione removeMeal");
      /*  console.log(localStorage);
            console.log(meal.name);
            console.log(JSON.parse(localStorage.getItem(meal.name))); */
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
      this.totPrice = this.totPrice.toFixed(2);
      return;
    },
    /* OPEN CART AT CLICK */
    openCart() {
      console.log("opening cart");
      this.isCartOpen = !this.isCartOpen;
      console.log(this.isCartOpen);
    },
  },
};
</script>

<template>
  <!-- WRAPPER -->
  <div v-if="loading">
    <div id="preloader"></div>
  </div>
  <div v-else>
    <div class="wrapper">
      <!-- HERO IMG -->
      <div class="hero-img">
        <img
          v-if="curRestaurant.image"
          :src="
            curRestaurant.image.includes('http')
              ? curRestaurant.image
              : `${store.baseUrl}/storage/${curRestaurant.image}`
          "
          alt=""
        />
      </div>
      <!-- MAIN CONATINER -->
      <div class="main-container row d-flex w-100 m-0">
        <div
          class="m-auto row flex-column justify-content-center align-items-center px-5 col-12 col-lg-8"
        >
          <!-- TITLE CARD -->
          <div v-if="curRestaurant" class="_title-card col-12 text-center p-3">
            <h2>{{ curRestaurant.name }}</h2>
            <p>{{ curRestaurant.address }}</p>
            <p>
              <strong>Telephone: </strong>
              {{ curRestaurant.phone }}
            </p>
            <hr />
          </div>
          <!-- END TITLE CARD -->

          <div class="container mb-5">
            <div
              v-if="curRestaurant"
              class="menu text-start d-flex flex-column"
            >
              <h3 class="mb-3">Menu</h3>
              <!-- Menu card -->
              <div
                v-for="meal in curRestaurant.meals"
                :key="meal.id"
                class="meal-card row d-flex flex-column flex-md-row mb-4"
              >
                <div
                  class="img-meal col-md-5 d-flex justify-content-center align-items-center p-0"
                  :class="{ 'd-none': !meal.is_active }"
                >
                  <img
                    v-if="meal.image"
                    :src="
                      meal.image.includes('http')
                        ? meal.image
                        : `${store.baseUrl}/storage/${meal.image}`
                    "
                    alt=""
                  />
                </div>
                <div
                  class="card-content col-md-7 p-3"
                  :class="{ 'd-none': !meal.is_active }"
                >
                  <h4>{{ meal.name }}</h4>
                  <p>Ingredients: {{ meal.description }}</p>
                  <p>Price: {{ meal.price }} €</p>
                  <button
                    @click="checkRestaurant(meal)"
                    class="btn btn-success"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <!-- end Menu card -->
            </div>
          </div>
        </div>

        <div class="cart-container col-lg-4 justify-content-center d-flex">
          <!-- CART BANNER -->
          <div
            class="cart-icon d-lg-none d-lg-none d-flex justify-content-between w-100 py-2"
            @click="openCart"
          >
            <h3>{{ isCartOpen ? "X" : "Show Cart" }}</h3>
            <div>
              <span>Total: {{ totPrice }} € </span>
              <i class="fa-solid fa-cart-shopping">
                <span
                  class="cart-icon-quantity"
                  v-if="storageMeal.length > 0"
                  >{{ totQuantity }}</span
                >
              </i>
            </div>
          </div>
          <!-- Small Cart -->
          <div class="small-cart d-lg-none" v-show="isCartOpen">
            <div class="small-cart-content">
              <div class="small-cart-meal pb-5">
                <h2>Your Order</h2>

                <ul class="ps-4" v-if="storageMeal.length > 0">
                  <li v-for="product in storageMeal">
                    <h5>{{ product.name }}</h5>
                    <p>Price: {{ product.price.toFixed(2) }}€</p>
                    <p>
                      Quantity: {{ product.quantity }}

                      <!-- buttons -->

                      <span
                        class="btn btn-danger mx-2 addRremove"
                        @click="removeMeal(product)"
                      >
                        <i class="fa-solid fa-minus"> </i>
                      </span>
                      <span
                        class="btn btn-success addRremove"
                        @click="addToCart(product)"
                      >
                        <i class="fa-solid fa-plus"></i>
                      </span>
                    </p>
                    <hr />
                  </li>
                </ul>
                <h3 v-else>Your order is empty</h3>

                <button
                  v-if="storageMeal.length > 0"
                  @click="clear()"
                  class="btn btn-danger mb-3 ms-3"
                  id="remove_all_small"
                >
                  Remove All
                </button>
                <div
                  v-if="totPrice > 0"
                  class="payment d-flex justify-content-evenly align-items-center"
                >
                  <h4><strong>Total: </strong>{{ totPrice }} €</h4>
                  <router-link
                    style="text-decoration: none"
                    :to="{
                      name: 'checkout',
                      params: { restaurant: curRestaurant },
                    }"
                  >
                    <button class="btn btn-warning payment-btn">Payment</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- CART -->
          <div class="d-none d-flex d-none d-lg-block flex-column cart py-2">
            <div class="cart-top">
              <div class="p-0 text-center">
                <h2>Your Order</h2>
                <p v-if="storageMeal.length > 0">
                  {{ storageMeal[0].restaurant }}
                </p>
                <hr />
              </div>
            </div>

            <div class="cart-bottom" v-if="storageMeal.length > 0">
              <ul v-if="storageMeal.length > 0">
                <li class="meal text-start" v-for="product in storageMeal">
                  <h5>{{ product.name }}</h5>
                  <p>Price: {{ product.price.toFixed(2) }} €</p>
                  <p>
                    Quantity: {{ product.quantity }}

                    <!-- buttons -->

                    <span
                      class="btn btn-danger mx-2 addRremove"
                      @click="removeMeal(product)"
                    >
                      <i class="fa-solid fa-minus"> </i>
                    </span>
                    <span
                      class="btn btn-success addRremove"
                      @click="addToCart(product)"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </span>
                  </p>
                  <hr />
                </li>
              </ul>
              <button
                v-if="storageMeal.length > 0"
                @click="clear()"
                class="btn btn-danger w-50 mx-3 my-3"
                id="remove_all_big"
              >
                Remove All
              </button>
            </div>
            <h4 v-else class="cart-bottom-else">Add meals to your cart!</h4>
            <div class="cart-bottom-utilities">
              <div v-if="totPrice > 0" class="cart_recap">
                <h4><strong>Total: </strong>{{ totPrice }} €</h4>
                <router-link
                  style="text-decoration: none"
                  :to="{
                    name: 'checkout',
                    params: { restaurant: curRestaurant },
                  }"
                >
                  <button class="btn btn-warning">Payment</button>
                </router-link>
              </div>
            </div>
          </div>
          <!-- END CART -->
        </div>
        <!-- END MAIN CONATINER -->
      </div>
      <!-- END WRAPPER -->
      <!-- MODAL -->
      <div
        class="_fixed _modal text-center"
        :class="{ 'd-none': showModal == false }"
      >
        <div class="modal-text p-3">
          <h3>
            Wait! You are in another restaurant! Before adding new meals to your
            order you have to clear your cart.
          </h3>
        </div>
        <div
          class="_modal-btn d-flex gap-2 justify-content-center align-items-center"
        >
          <button class="btn btn-success" @click="clearAndAdd">
            Proceed with new order <i class="fa-solid fa-cart-shopping"></i>
          </button>
          <button class="btn btn-warning" @click="hideModal">
            I'm just looking <i class="fa-solid fa-eye"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- END MODAL -->
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;

#preloader {
  background: #743c82 url("../assets/loading.gif") no-repeat center center;
  height: 100%;
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 1000;
}

.wrapper {
  width: 100%;
  .btn {
    background-color: $primary_violet;
    border-color: $primary_violet;
    color: white;

    &:hover {
      background-color: $primary_violet;
      color: white;
    }

    &:active {
      background-color: $secondary_violet !important;
      color: white !important;
    }
  }
}
.hero-img {
  width: 100%;
  height: 50vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
}

.main-container {
  background-color: $secondary-violet;
}
._title-card {
  width: 600px;
  @include response("md") {
    height: 200px;
  }
  height: 250px;
  background-color: $secondary-violet;
  color: white;
  border-radius: 15px;
  position: relative;
  bottom: 40px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.7rem;
    @include response("md") {
      margin-bottom: 2.5rem;
      font-size: 3rem;
    }
  }

  p {
    font-size: 0.7remrem;
    @include response("md") {
      font-size: 1.5rem;
    }
  }
}
.cart-container {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: $primary-white;
  @include response("sl") {
    position: relative !important;
    background-color: transparent;
  }

  #remove_all_small,
  #remove_all_big {
    width: 200px;
    background-color: $danger-btn;
  }

  .small-cart {
    width: 10px;
    height: 10px;
    position: sticky;
    top: 100px;
    .small-cart-content {
      position: fixed;
      width: 100%;
      height: calc(100vh - 50px);
      background-color: rgba(128, 128, 128, 0.591);
      right: 0px;
      top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;

      .small-cart-meal {
        background-color: $primary-white;
        // min-height: 100%;
        height: calc(100vh - 50px);
        width: 100%;
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: 10px;
        }

        &::-webkit-scrollbar-track {
          /* box-shadow: inset 0 0 5px grey; */
          border-radius: 10px;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: $primary-violet;
          border-radius: 10px;
        }

        hr {
          color: $primary-violet;
        }
        h2 {
          text-align: center;
          padding: 10px;
          width: 100%;
          background-color: $primary-violet;
          color: $primary-white;
          z-index: 10;
        }
        h3 {
          text-align: center;
          margin-top: 50px;
        }
        /* .order-list {
          overflow-y: auto;
        } */

        .payment {
          position: fixed;
          bottom: 50px;
          left: 0;
          background-color: $primary-white;
          width: 100%;

          .payment-btn {
            /* background-color: $primary-green;
            color: $primary-violet;
            font-weight: bolder; */
            width: 200px;
          }
        }
      }
    }
  }
  .cart-icon {
    h3 {
      color: $primary-violet;
    }

    i {
      color: $primary-violet;
      padding: 10px;
      background-color: white;
      border-radius: 50%;
      position: sticky;
      top: 100px;
      z-index: 10;
      border: 2px solid $primary-violet;
      margin-left: 15px;
    }
    .cart-icon-quantity {
      font-size: 8px;
      color: $primary-violet;
      padding: 8px;
      border-radius: 50%;
      background-color: $primary-green;
      position: absolute;
      left: 20px;
      top: -10px;
    }
  }
  .cart {
    width: 300px;
    height: 450px;
    /* background-color: $primary-white; */
    color: darken($color: $primary-violet, $amount: 15);
    border-radius: 15px;
    position: sticky;
    /* bottom: 40px; */
    top: 80px;
    margin-top: 100px;
    /* overflow-y: auto; */
    .addRremove {
      font-size: 0.5rem;
    }
    .cart-top {
      background-color: $primary-white;
      height: 80px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
    .cart-bottom {
      background-color: $primary-white;
      height: 100%;
      max-height: 300px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 10px;
        ul {
          padding-top: 10px;
        }
      }

      &::-webkit-scrollbar-track {
        /* box-shadow: inset 0 0 5px grey; */
        border-radius: 10px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: $primary-violet;
        border-radius: 10px;
      }
    }
    .cart-bottom-else {
      background-color: $primary-white;
      text-align: center;
      padding: 10px 0;
      margin-top: -20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    .cart-bottom-utilities {
      background-color: $primary-white;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    .cart_recap {
      position: sticky;
      bottom: -10px;
      left: 0;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      background-color: $primary-white;
      height: 60px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    .meal {
      p {
        font-size: 16px;
      }
    }

    li {
      padding: 2px 10px;
      p {
        font-size: 18px;
      }
      p,
      h2 {
        margin: 0;
      }
    }
  }
}

ul {
  list-style: none;
}

.menu {
  min-height: 300px;
  width: 100%;
  align-items: center;
  /* background-color: $secondary-violet; */
  border-radius: 15px;
  color: darken($color: $primary-violet, $amount: 15);
  h3 {
    color: white;
    text-align: center;
    font-size: 1.5rem;
    @include response("md") {
      font-size: 2rem;
    }
  }

  .meal-card {
    background-color: $primary-white;
    width: 100%;
    border-radius: 15px;
    @include response("md") {
      width: 100%;
      border-radius: 15px;
    }

    .card-content {
      h4 {
        font-size: 1rem;
        font-weight: bolder;
        @include response("md") {
          font-size: 2rem;
        }
      }
      p {
        font-size: 0.8rem;
        @include response("md") {
          font-size: 1.5rem;
        }
      }
      button {
        font-size: 0.8rem;
        width: 100%;
        @include response("md") {
          font-size: 1.5rem;
        }
      }
    }

    .img-meal {
      img {
        @include response("md") {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        border-radius: 10px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

/* MODAL */
._fixed {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;

  .modal-text {
    background-color: lighten($color: $primary-violet, $amount: 25);
    color: white;
    width: 90%;
    font-size: 1.2rem;
    height: 150px;
    margin-bottom: 10px;
    @include response("sm") {
      width: 90%;
      height: 130px;
      margin-bottom: 20px;
    }
  }
}
._modal-btn {
  /* background-color: darken($color: grey, $amount: 25); */
  width: 100%;
  height: 100px;
  padding: 10px;
  @include response("md") {
    height: 60px;
    width: 60%;
    margin-bottom: 20px;
  }
  button {
    font-size: 1.2rem;
    margin: 0 15px;
  }
}
._modal {
  background-color: rgba(128, 128, 128, 0.591);
}
</style>
