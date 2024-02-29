<script>
import axios from "axios";
import { store, addToTotal, clear, showStorage } from "../store";

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
        this.storageMeal = showStorage(this.storageMeal);
        if (localStorage.length > 0) {
          this.totPrice = addToTotal(this.storageMeal);
        }
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
      this.storageMeal = showStorage(this.storageMeal);
      this.totPrice = addToTotal(this.storageMeal);
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
    clearAndAdd() {
      clear();
      this.addToCart(this.currMeal);
      this.hideModal();
    },
    /* Clear the localstorage and show the cart */
    clearAndShow() {
      clear();
      this.storageMeal = showStorage(this.storageMeal);
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
          this.storageMeal = showStorage(this.storageMeal);
          this.totPrice = addToTotal(this.storageMeal);
        }
        //Altrimenti elimino il piatto
        else {
          console.log("secondo else");
          localStorage.removeItem(meal.name);
          this.storageMeal = showStorage(this.storageMeal);
          this.totPrice = addToTotal(this.storageMeal);
        }
      } else {
        console.log("non c'è");
      }
    },
    /* ************************************************************************ */
  },
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
    <!--WRAPPER HERO-->
    <div>
        <div v-if="loading">
            <h3 class="text-center">Loading...</h3>
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
          <h4 v-if="storageMeal.length > 0">Tot: {{ totPrice }}</h4>
          <button class="btn btn-danger" @click="clearAndShow()">Clear</button>

        <div v-else>
            <div class="image-hero d-flex flex-column">
                <img :src="curRestaurant.image" />
            </div>

            <div class="my-container">

                <!-- ******************** CARD INFO RESTAURANT ********************-->
                <div class="flex justify-content-center text-center align-items-start align-self-stretch">

                    <div class="card-restaurant-details card me-3 py-3 px-5 rounded border-0 text-white">
                        <div class="content-info">
                            <h2>{{ curRestaurant.name }}</h2>
                            <p>{{ curRestaurant.address }}</p>
                            <hr>
                            <p>Notes: The restaurant does not accept meal vouchers.</p>
                        </div>
                    </div>
                    <!-- ******************** / CARD INFO RESTAURANT ********************-->

                    <!-- ******************************* CART ************************ -->
                    <div class="card-cart card py-3 px-5 mt-3 rounded border-0 text-white text-center">
                        <p class="your-order">Your order</p>

                        <!--BUTTON ^ FOR ORDER-->
                        <div class="scrollbar btn-group dropup">

                            <button type="button" class="btn dropdown-toggle btn-order" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Order
                            </button>
                             <!--LIST ORDER MEALS-->
                            <ul class="dropdown-menu">
                                <li v-for="product in storageMeal">
                                    <h4>
                                        {{ product.name }}
                                        <span><button class="remove-btn btn rounded-circle" @click="removeMeal(product)">
                                                X
                                            </button></span>
                                    </h4>

                                    <p>Price: {{ product.price.toFixed(2) }}€</p>
                                    <p>Quantity: {{ product.quantity }}</p>
                                    <p>
                                        <strong>Restaurant: </strong>
                                        {{ product.restaurant }}
                                    </p>
                                </li>
                            </ul>
                        </div>
                         <!--TOT AND BUTTON "CLEAR" E "PAYMENT"-->
                        <p class="mb-4 Tot">Tot: {{ totPrice.toFixed(2) }}€</p>
                        <div class="cart-btn d-flex justify-content-between">
                            <button class="clear-btn btn btn-sm" @click="clear()">Clear</button>
                            <button class="checkout-btn btn btn-sm">Go to payment</button>
                        </div>
                    </div>
                    <!-- ****************************** / CART ********************* -->
                </div>

                <!-- ****************************** MENU ****************************** -->
                <div class="menu card card-menu">
                    <h2 class="py-3 text-white text-center">Menu</h2>

                    <!--CARD MEAL-->
                    <ul v-for="meal in curRestaurant.meals" :key="meal.id"
                        class="list-unstyled card card-single-meal p-3 border-0 text-white mb-3">
                        <li class="fw-bold mb-2 fs-5">{{ meal.name }}</li>
                        <li><img :src="meal.image" style="height: 150px; max-width: 100%;" />
                        </li>
                        <li>
                            <p class="fst-italic">Ingredients: {{ meal.description }}</p>
                        </li>
                        <li>
                            <p class="fw-bold">{{ meal.price }}€</p>
                        </li>
                        <li>
                            <p>{{ meal.is_active ? "Available" : "Not Available" }}</p>
                        </li>
                        <li>
                            <button class="buy-btn btn" :disabled="!meal.is_active" @click="checkRestaurant(meal)">
                                Buy
                            </button>
                        </li>
                    </ul>
                </div>
                 <!-- ****************************** / MENU ****************************** -->
            </div>
        </div>
    </div>

    <!-- ****************************** MODAL ****************************** -->
    <div class="_fixed _modal" :class="{ 'd-none': showModal == false }">
        <h3>
            Wait! You are in another restaurant! Before to add new meals to your order
            you have to clear your cart.
        </h3>
        <button class="btn btn-warning" @click="clearAndAdd">Clear cart</button>
        <button class="btn btn-success" @click="hideModal">Don't buy</button>
    </div>
    <!-- ****************************** MODAL ****************************** -->
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
@use "../style/partials/variables" as *;
@use '../style/partials/mixin' as *;

.image-hero {
    .img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
}

.my-container {
    width: 100%;
    height: 100%;
    padding-left: 40px;
    padding-right: 40px;
    background-color: $secondary-green;
    padding-bottom: 3rem;


    .card-menu {
        width: 100%;
        background-color: $card-violet;
        padding: 0 3rem;

        // card-menu-responsive-tablet
        @include response("md") {
            width: 60%;
            position: relative;
            left: 130px;
        }
        // card-menu-responsive-desktop
        @include response("l") {
            position: relative;
            left: 0;

        }

        .card-single-meal {
            background-color: $primary-green;
            font-size: 10px;

            p {
                padding-top: 5px;
                margin: 0;
            }

            // card-single-meal-responsive-tablet
            @include response("md") {
                font-size: 20px;

                p {
                    padding-top: 10px;
                    margin: 0;
                }
            }
            // image-card-single-meal-responsive-tablet
            img {
                width: 200px;

                @include response("md") {
                    width: 300px;
                }
            }
        }

        .buy-btn {
            background-color: $secondary-violet;
            color: white;
            margin-top: 5px;
        }
    }

    .flex {
        position: relative;
        top: -50px;

        // flex-responsive-tablet
        @include response("md") {
            display: flex;
        }

        .card-restaurant-details {
            background-color: $card-violet;
            width: 100%;

            // card-restaurant-details-responsive-tablet
            @include response("md") {
                width: 60%;
            }

            // card-restaurant-details-responsive-desktop
            @include response("l") {
                position: relative;
                right: 180px;
            }

            hr {
                border: 1px solid white;
            }
        }

        .card-cart {
            background-color: $primary-violet;
            width: 100%;
            height: 40px;
            position: fixed;
            bottom: 300px; //* METTI A 0 *//
            left: 0;
            z-index: 100;
            font-size: 10px;

            .your-order {
                display: none;
            }

            .Tot {
                position: relative;
                bottom: 6px;
                font-size: 12px;
            }

            .scrollbar {
                //display: none;
                .btn-order{
                   //width: 20px;
                   position: relative;
                   right: 140px;
                   bottom: 12px;
                   color: white;
                   font-size: 12px;
                }
            }

            // card-cart-responsive-tablet
            @include response("md") {
                position: fixed;
                bottom: 0;
                left: 0;
                z-index: 100;
                font-size: 20px;

                .scrollbar {
                    overflow-y: auto;
                    max-height: 20vh;
                }
            }
            
            // card-cart-responsive-desktop
            @include response("l") {
                width: 30%;
                position: fixed;
                top: 16%;
                left: 65%;
                background-color: $card-violet;
                height: 50vh;
                font-size: 30px;
            }

            hr {
                border: 1px solid white;
            }

            ul {
                list-style-type: none;

                .remove-btn {
                    background-color: $primary-green;
                    color: white;
                }
            }

            .cart-btn {
                //* BOTTONI   *//
                position: relative;
                bottom: 54px;

            }

            .clear-btn {
                background-color: $primary-green;
                color: white;
                display: none;
            }

            .checkout-btn {
                background-color: $primary-green;
                color: white;
                font-size: 12px;
                margin-top: 1.5px;
                position: relative;
                left: 220px;
            }
        }
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
}</style>
   

            
          