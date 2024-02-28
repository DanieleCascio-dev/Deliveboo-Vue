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
    <div class="wrapper">
        <div v-if="loading">
            <h3 class="text-center">Loading...</h3>
        </div>
        <div v-else>
            <div class="image-hero d-flex flex-column">
                <img :src="curRestaurant.image" />
            </div>
        </div>
    </div>

    <!--CONTAINER PER I PIATTI-->
    <div class="my-container">

        <!--CARD INFO RISTORANTE-->
        <div class="flex d-flex justify-content-center text-center align-items-start align-self-stretch">

            <div class="card-restaurant-details card me-3 py-3 px-5 rounded border-0 text-white">
                <h2>{{ curRestaurant.name }}</h2>
                <p>{{ curRestaurant.address }}</p>
                <hr>
                <p>Notes: The restaurant does not accept meal vouchers.</p>
            </div>

            <!-- ******************************* CART ************************ -->
            <div class="card-cart card py-3 px-5 rounded border-0 text-white text-center">
                <h2>Your order</h2>
                <hr>
                <ul>
                    <li v-for="product in storageMeal">
                        <h4>
                            {{ product.name }}
                            <span><button class="remove-btn btn rounded-circle" @click="removeMeal(product)">
                                    X
                                </button></span>
                        </h4>

                        <p>Price: {{ product.price }}€</p>
                        <p>Quantity: {{ product.quantity }}</p>
                        <p>
                            <strong>Restaurant: </strong>
                            {{ product.restaurant }}
                        </p>
                    </li>
                </ul>
                <h4 class="mb-4">Tot: {{ totPrice }}€</h4>
                <div class="cart-btn d-flex justify-content-center">
                    <button class="clear-btn btn me-5 w-75" @click="clear()">Clear</button>
                    <button class="checkout-btn btn w-75">Go to payment</button>
                </div>
            </div>
            <!-- ****************************** END CART ********************* -->
        </div>

        <!--MENU-->
        <div>
            
            <div class="menu card card-menu">
                <h2 class="py-3 text-white text-center">Menu</h2>
                <!--CARD PER I PIATTI-->
                <ul v-for="meal in curRestaurant.meals" :key="meal.id" class="list-unstyled card card-single-meal p-3 border-0 text-white">
                    <li class="fw-bold mb-2 fs-5">{{ meal.name }}</li>
                    <li><img :src="meal.image" style="height: 150px; max-width: 100%;" /></li>
                    <li>
                        <p class="fst-italic pt-4">Ingredients: {{ meal.description }}</p>
                    </li>
                    <li>
                        <p class="fw-bold">{{ meal.price }}</p>
                    </li>
                    <li>
                        <p class="">{{ meal.is_active ? "Available" : "Not Available" }}</p>
                    </li>
                    <li>
                        <button class="buy-btn btn" :disabled="!meal.is_active" @click="checkRestaurant(meal)">
                            Buy
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    </div>

    <!-- MODAL -->
    <div class="_fixed _modal" :class="{ 'd-none': showModal == false }">
        <h3>
            Wait! You are in another restaurant! Before to add new meals to your order
            you have to clear your cart.
        </h3>
        <button class="btn btn-warning" @click="clearAndAdd">Clear cart</button>
        <button class="btn btn-success" @click="hideModal">Don't buy</button>
    </div>
</template>



<style lang="scss" scoped>
@use "../style/partials/variables" as *;


.wrapper {
    width: 100%;
    height: 600px;
    overflow: hidden;


    .image-hero {
        .img {
            width: 100%;
            height: auto;
            object-fit: cover;
        }
    }
}

.my-container {
    width: 100%;
    padding-left: 40px;
    padding-right: 40px;
    background-color: $secondary-green;
    padding-bottom: 3rem;


    .card-menu {
        width: 60%;
        background-color: $card-violet;
        padding: 0 3rem;
        
        .card-single-meal {
            background-color: $primary-green;

            img {
                width: 200px;
            }
        }

        .buy-btn {
            background-color: $secondary-violet;
            color: white;
        }

    }

    .flex {
        position: relative;
        top: -50px;


        .card-restaurant-details {
            background-color: $card-violet;
            width: 70%;

            hr {
                border: 1px solid white;
            }
        }

        .card-cart {
            background-color: $card-violet;
            width: 30%;

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

            .clear-btn {
                background-color: $primary-green;
                color: white;
            }

            .checkout-btn {
                background-color: $primary-green;
                color: white;
            }

            // Rendi il carrello fisso

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
}
</style>
   

            
          