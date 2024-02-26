<script>
import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            store,
            curRestaurant: null,
            loading: false,
            totPrice: null,
            storageMeal: [],
            
        }
    },
    methods: {
        addToTotal() {
            this.storageMeal.forEach((meal) => {
                this.totPrice += (meal.price * meal.quantity)
            })
        },
        addToCart(meal) {
            if (localStorage.getItem(meal.name)) {
                console.log('ciao');
                let quantity = JSON.parse(localStorage.getItem(meal.name));
                console.log(quantity.quantity);
                localStorage.setItem(meal.name, JSON.stringify({
                    'name': meal.name,
                    'image': meal.image,
                    'description': meal.description,
                    'price': parseFloat(meal.price),
                    'quantity': quantity.quantity +1,
                }))
                this.showStorage();
                // this.addToTotal(meal.price);
            } else {
                localStorage.setItem(meal.name, JSON.stringify({
                    'name': meal.name,
                    'image': meal.image,
                    'description': meal.description,
                    'price': parseFloat(meal.price),
                    'quantity': 1,
                }))
            }
            this.showStorage();
            // this.addToTotal(meal.price);
            console.log(this.storageMeal);

            console.log(localStorage);
            console.log(Object.keys(localStorage), localStorage.getItem(meal.name));
        },
        total() {
            return this.totPrice = JSON.parse(localStorage.getItem('totPrice')) ?? 0;
        },
        clear() {
            localStorage.clear();
            console.log(localStorage);
        },
        showStorage() {
            this.storageMeal = [];
            Object.keys(localStorage).forEach(key => {
                this.storageMeal.push(JSON.parse(localStorage.getItem(key)));
            });
            this.totPrice = 0;
            this.addToTotal();
        }
    },
    created() {
        console.log(localStorage);
        this.loading = true;
        axios
            .get(`${this.store.baseUrl}/api/restaurants/roero-e-figli-ristorante`)/*${this.$route.params.slug}*/
            .then((resp) => {
                // console.log(resp);
                if (resp.data.success) {
                    this.curRestaurant = resp.data.results;
                } else {
                    this.$router.push({ name: 'not-found' })
                }
            })
            .finally(() => {
                this.loading = false;
            });
        if (localStorage) {
            this.showStorage();
        }
    },

}
</script>

<template>
    <div class="container">

        <div v-if="loading">
            <h3 class="text-center">Loading...</h3>
        </div>
        <div v-else>
            <img src="../assets/pizza margherita.jpg" alt="">
            <h2>{{ curRestaurant.name }}</h2>
            <p>{{ curRestaurant.address }}</p>
            <div class="d-flex">
                <div>
                    <h4>Menu</h4>
                    <ul v-for="meal in curRestaurant.meals" :key="meal.id">
                        <li>{{ meal.name }}</li>
                        <li><img :src="meal.image" alt=""></li>
                        <li>
                            <p>{{ meal.description }}</p>
                        </li>
                        <li>
                            <p>{{ meal.price }}</p>
                        </li>
                        <li><button class="btn btn-success" @click="addToCart(meal)">Buy</button></li>
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

<style lang="scss" scoped></style>