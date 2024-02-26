<script>
import { store } from '../store';
import axios from 'axios';
export default {
    data() {
        return {
            store,
            restaurants: [],
            categories: [],
            searchText: "",
            checkedCategories: [],
            curPage: 1,
            totPage: 1
        };
    },
    created() {
        this.getRestaurants(1);
        this.getCategories();
    },
    methods: {
        getRestaurants(pageNum) {
            this.curPage = pageNum;
            const paramsToSend = {
                page: pageNum
            };
            
            if(this.$route.params.id){
                this.checkedCategories.push(this.$route.params.id)
            };

            if (this.searchText !== "") {
                paramsToSend.search = this.searchText;
            };
            if (this.checkedCategories.length > 0) {
                paramsToSend.category_id = this.checkedCategories;
            };

            axios.get(`${this.store.baseUrl}/api/restaurants/`, {
                params: paramsToSend
            }).then((resp) => {
                this.restaurants = resp.data.results.data;
                this.totPage = resp.data.results.last_page;
            })
        },
        getCategories() {
            axios.get(`${this.store.baseUrl}/api/categories`)
                .then((resp) => {
                    this.categories = resp.data.results;
                });
        },
}
}
</script>
<template>
    <div class="container-fluid">
        <div class="row row-cols-2 row-cols-md-4 py-3">
            <div class="form-check col" v-for="category in categories" :key="category.id">
                <div class="form-check">
                    <input class="form-check-input hidden" @change="getRestaurants" v-model="checkedCategories"
                        type="checkbox" :value="category.id" :id="category.name">
                    <label class="form-check-label" :for="category.name">
                        {{ category.name }}
                    </label>
                </div>
            </div>
        </div>
        <div class="row justify-content-center pb-3">
            <div class="col-11">
                <label for="search" class="visually-hidden">Search Restaurant</label>
                <input type="text" v-model.trim="searchText" @keyup="getRestaurants" id="search" class="form-control"
                    placeholder="Search Restaurant">
            </div>
        </div>
        <div v-for="restaurant in restaurants " :key="restaurant.id">
            <h2>{{ restaurant.name }}</h2>
        </div>

        <nav aria-label="Result page for projects">
            <ul class="pagination justify-content-end">
                <li  class="page-item" :class="{'disabled': curPage === 1}"><a tabindex="-1" class="page-link" href=""
                        @click.prevent="getRestaurants(curPage - 1)"><i class="fa-solid fa-left-long"></i></a></li>
                <li v-for="page in totPage" class="page-item" :class="{'active': page === curPage}"><a class="page-link" href=""
                        @click.prevent="getRestaurants(page)">{{ page }}</a></li>
                <li class="page-item" :class="{'disabled': curPage === totPage}"><a tabindex="-1" class="page-link" href="" @click.prevent="getRestaurants(curPage + 1)"><i class="fa-solid fa-right-long"></i></a>
                </li>
            </ul>
        </nav>

    </div>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.hidden {
    position: absolute;
    visibility: hidden;
    opacity: 0;
}

input[type=checkbox]+label {
    color: white;
    background-color: $primary-violet;
    padding: .2rem .5rem;
    border-radius: 10px;
    font-style: italic;
}

input[type=checkbox]:checked+label {
    color: $primary-green;
    font-style: normal;
}

input[type="text"] {
    color: $primary-green;
    background-color: $primary-violet;
    &:focus {
        border-color: $primary-green;
        box-shadow: 0 0 0 0.25rem $primary-green;
    }
    &::placeholder {
        color: white;
    }
}

.page-link {
    color: white;
    background-color: $primary-violet;

    &:hover {
        color: $primary-violet;
        background-color: $primary-green;
    }

    &:focus {
        color: $primary-violet;
        background-color: $primary-green;
        box-shadow: none;
    }
} 

.page-link.active, .active > .page-link {
    color: $primary-violet;
    background-color: $primary-green;
    border-color: $primary-green;
}
</style>