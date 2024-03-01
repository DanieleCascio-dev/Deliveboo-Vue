<script>
import axios from "axios";
import { store } from "../store";
export default {
  data() {
    return {
      store,
      curRestaurant: null,
      loading: false,
      totPrice: 0,
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
  },
};
</script>

<template>
  <!-- WRAPPER -->
  <div v-if="loading">
    <h3 class="text-center">Loading...</h3>
  </div>
  <div v-else class="wrapper">
    <!-- HERO IMG -->
    <div class="hero-img">
      <img v-if="curRestaurant" :src="curRestaurant.image" alt="" />
    </div>
    <!-- MAIN CONATINER -->
    <div class="main-container row d-flex">
      <div
        class="row flex-column justify-content-center align-items-center px-5 col-8"
      >
        <!-- TITLE CARD -->
        <div v-if="curRestaurant" class="_title-card col12 text-center p-0">
          <h2>{{ curRestaurant.name }}</h2>
          <p>{{ curRestaurant.address }}</p>
          <p>
            <strong>Telephone: </strong>
            {{ curRestaurant.phone }}
          </p>
        </div>
        <!-- END TITLE CARD -->

        <div class="container mb-5">
          <div
            v-if="curRestaurant"
            class="menu text-start p-5 d-flex flex-column"
          >
            <h3 class="mb-3">Menu</h3>
            <!-- Menu card -->
            <div
              v-for="meal in curRestaurant.meals"
              :key="meal.id"
              class="meal-card row d-flex mb-4"
            >
              <div
                class="img-meal col-5 d-flex justify-content-center align-items-center p-0"
              >
                <img :src="meal.image" alt="" />
              </div>
              <div class="card-content col-7 p-3">
                <h4>{{ meal.name }}</h4>
                <p>Ingredients: {{ meal.description }}</p>
                <p>Price: {{ meal.price }} €</p>
                <button @click="checkRestaurant(meal)" class="btn btn-success">
                  Add to cart
                </button>
              </div>
            </div>
            <!-- end Menu card -->
          </div>
        </div>
      </div>

      <div class="cart-container col-4 justify-content-center d-flex">
        <!-- CART -->
        <div class="d-flex flex-column cart py-2">
          <div class="p-0 text-center">
            <h2>Your Order</h2>
            <hr />

            <ul v-if="storageMeal.length > 0">
              <li class="meal text-start" v-for="product in storageMeal">
                <h5>{{ product.name }}</h5>
                <p>Price: {{ product.price }}</p>
                <p>
                  Quantity: {{ product.quantity }}

                  <!-- buttons -->

                  <span
                    class="btn btn-danger mx-2"
                    @click="removeMeal(product)"
                  >
                    <i class="fa-solid fa-minus"> </i>
                  </span>
                  <span class="btn btn-success" @click="addToCart(product)">
                    <i class="fa-solid fa-plus"></i>
                  </span>
                </p>
              </li>
            </ul>
            <h3 v-else>Your order is empty</h3>
          </div>
          <button
            v-if="storageMeal.length > 1"
            @click="clear()"
            class="btn btn-danger w-50 mx-3"
          >
            Remove All
          </button>
          <div v-if="totPrice > 0" class="payment p-3">
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
      <button class="btn btn-warning" @click="clearAndAdd">Clear cart</button>
      <button class="btn btn-success" @click="hideModal">Don't buy</button>
    </div>
  </div>
  <!-- END MODAL -->
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;

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
      background-color: $primary_violet !important;
      color: white !important;
    }
  }
}
.hero-img {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
}
._title-card {
  width: 500px;
  height: 250px;
  background-color: $card-violet;
  color: white;
  border-radius: 15px;
  position: relative;
  bottom: 40px;
}
.cart-container {
  position: relative;
  .cart {
    width: 300px;
    height: 450px;
    background-color: $card-violet;
    color: white;
    border-radius: 15px;
    position: sticky;
    /* bottom: 40px; */
    top: 20px;
    margin-top: -64px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: $primary-violet;
      border-radius: 10px;
    }

    .payment {
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
  background-color: $secondary-violet;
  border-radius: 15px;
  color: white;

  .meal-card {
    background-color: $primary-green;
    width: 70%;
    border-radius: 15px;
    .img-meal {
      img {
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
    width: 70%;
    height: 100px;
  }
}
._modal-btn {
  /* background-color: darken($color: grey, $amount: 25); */
  width: 30%;
  height: 60px;
  padding: 10px;
}
._modal {
  background-color: rgba(128, 128, 128, 0.591);
}
// .my-container {
//   width: 100%;
//   height: 100%;
//   padding-left: 40px;
//   padding-right: 40px;
//   background-color: $secondary-green;
//   padding-bottom: 3rem;
//   .card-menu {
//     width: 100%;
//     background-color: $card-violet;
//     padding: 0 3rem;
//     // card-menu-responsive-tablet
//     @include response("md") {
//       width: 60%;
//       position: relative;
//       left: 130px;
//     }
//     // card-menu-responsive-desktop
//     @include response("l") {
//       position: relative;
//       left: 0;
//     }
//     .card-single-meal {
//       background-color: $primary-green;
//       font-size: 10px;
//       p {
//         padding-top: 5px;
//         margin: 0;
//       }
//       // card-single-meal-responsive-tablet
//       @include response("md") {
//         font-size: 20px;
//         p {
//           padding-top: 10px;
//           margin: 0;
//         }
//       }
//       // image-card-single-meal-responsive-tablet
//       img {
//         width: 200px;
//         @include response("md") {
//           width: 300px;
//         }
//       }
//     }
//     .buy-btn {
//       background-color: $secondary-violet;
//       color: white;
//       margin-top: 5px;
//     }
//   }
//   .flex {
//     position: relative;
//     top: -50px;
//     // flex-responsive-tablet
//     @include response("md") {
//       display: flex;
//     }
//     .card-restaurant-details {
//       background-color: $card-violet;
//       width: 100%;
//       // card-restaurant-details-responsive-tablet
//       @include response("md") {
//         width: 60%;
//       }
//       // card-restaurant-details-responsive-desktop
//       @include response("l") {
//         position: relative;
//         right: 180px;
//       }
//       hr {
//         border: 1px solid white;
//       }
//     }
//     .card-cart {
//       background-color: $primary-violet;
//       width: 100%;
//       height: 40px;
//       position: fixed;
//       bottom: 300px; //* METTI A 0 *//
//       left: 0;
//       z-index: 100;
//       font-size: 10px;
//       .your-order {
//         display: none;
//       }
//       .Tot {
//         position: relative;
//         bottom: 6px;
//         font-size: 12px;
//       }
//       .scrollbar {
//         //display: none;
//         .btn-order {
//           //width: 20px;
//           position: relative;
//           right: 140px;
//           bottom: 12px;
//           color: white;
//           font-size: 12px;
//         }
//       }
//       // card-cart-responsive-tablet
//       @include response("md") {
//         position: fixed;
//         bottom: 0;
//         left: 0;
//         z-index: 100;
//         font-size: 20px;
//         .scrollbar {
//           overflow-y: auto;
//           max-height: 20vh;
//         }
//       }

//       // card-cart-responsive-desktop
//       @include response("l") {
//         width: 30%;
//         position: fixed;
//         top: 16%;
//         left: 65%;
//         background-color: $card-violet;
//         height: 50vh;
//         font-size: 30px;
//       }
//       hr {
//         border: 1px solid white;
//       }
//       ul {
//         list-style-type: none;
//         .remove-btn {
//           background-color: $primary-green;
//           color: white;
//         }
//       }
//       .cart-btn {
//         //* BOTTONI   *//
//         position: relative;
//         bottom: 54px;
//       }
//       .clear-btn {
//         background-color: $primary-green;
//         color: white;
//         display: none;
//       }
//       .checkout-btn {
//         background-color: $primary-green;
//         color: white;
//         font-size: 12px;
//         margin-top: 1.5px;
//         position: relative;
//         left: 220px;
//       }
//     }
//   }

// }
</style>
