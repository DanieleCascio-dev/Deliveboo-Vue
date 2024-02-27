<script>
import RestaurantCard from "../components/RestaurantCard.vue";
import { store } from "../store";
import axios from "axios";
export default {
  data() {
    return {
      store,
      restaurants: [],
      categories: [],
      searchText: "",
      checkedCategories: [],
      curPage: 1,
      totPage: 1,
    };
  },
  created() {
    if (this.$route.params.id) {
      this.checkedCategories.push(this.$route.params.id);
    }
    this.getRestaurants(1);
    this.getCategories();
  },
  methods: {
    getRestaurants(pageNum) {
      console.log(this.curPage);
      console.log(this.checkedCategories);
      this.curPage = pageNum;
      const paramsToSend = {
        page: pageNum,
      };
      if (this.searchText !== "") {
        paramsToSend.search = this.searchText;
      }
      if (this.checkedCategories.length > 0) {
        paramsToSend.category_id = this.checkedCategories;
      }
      axios
        .get(`${this.store.baseUrl}/api/restaurants/`, {
          params: paramsToSend,
        })
        .then((resp) => {
          this.restaurants = resp.data.results.data;
          this.totPage = resp.data.results.last_page;
        });
    },
    getCategories() {
      axios.get(`${this.store.baseUrl}/api/categories`).then((resp) => {
        this.categories = resp.data.results;
      });
    },
    checked(id) {
      if (this.$route.params.id == id) {
        return true;
      } else {
        return false;
      }
    },
    cleanFilter() {
      this.checkedCategories = [];
      this.searchText = '';
      this.getRestaurants(1);
    }
  },
  components: { RestaurantCard },
};
</script>
<template>
  <div class="container-fluid">
    <div class="row row-cols-2 row-cols-md-4 py-3">
      <div class="form-check col" v-for="category in categories" :key="category.id">
        <div class="form-check">
          <input class="form-check-input hidden" :checked="checked(category.id)" @change="getRestaurants(1)"
            v-model="checkedCategories" type="checkbox" :value="category.id" :id="category.name" />
          <label class="form-check-label" :for="category.name">
            {{ category.name }}
          </label>
        </div>
      </div>
    </div>
    <div class="row justify-content-center pb-3">
      <div class="col-11">
        <label for="search" class="visually-hidden">Search Restaurant</label>
        <input type="text" v-model.trim="searchText" @keyup="getRestaurants(1)" id="search" class="form-control"
          placeholder="Search Restaurant" />
      </div>
    </div>

    <div class="container">
      <div v-if="restaurants.length > 0" class="py-3" v-for="restaurant in restaurants" :key="restaurant.id">
        <router-link style="text-decoration: none" :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }">
          <RestaurantCard :restaurant="restaurant" />
        </router-link>
      </div>
      <div v-else class="py-3">
        <div class="alert alert-dismissible" >
          <strong>No Restaurants found! </strong>Try another filter.
          <button type="button" @click="cleanFilter" class="btn-close"></button>
        </div>
      </div>
    </div>

    <nav class="pb-3" aria-label="Result page for projects">
      <ul class="pagination justify-content-end m-0">
        <li class="page-item" :class="{ disabled: curPage === 1 }">
          <a tabindex="-1" class="page-link" href="" @click.prevent="getRestaurants(curPage - 1)"><i
              class="fa-solid fa-left-long"></i></a>
        </li>
        <li v-for="page in totPage" class="page-item" :class="{ active: page === curPage }">
          <a class="page-link" href="" @click.prevent="getRestaurants(page)">{{
            page
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: curPage === totPage }">
          <a tabindex="-1" class="page-link" href="" @click.prevent="getRestaurants(curPage + 1)"><i
              class="fa-solid fa-right-long"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;

.container-fluid {
  background-color: $primary-green;
}

.hidden {
  position: absolute;
  visibility: hidden;
  opacity: 0;
}

input[type="checkbox"]+label {
  color: white;
  background-color: $primary-violet;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-style: italic;
}

input[type="checkbox"]:checked+label {
  color: $primary-green;
  font-style: normal;
}

input[type="text"] {
  color: $primary-violet;
  background-color: white;

  &:focus {
    border-color: $primary-violet;
    box-shadow: 0 0 0 0.25rem $primary-green;
  }

  &::placeholder {
    color: $primary-violet;
  }
}

.page-link {
  color: white;
  background-color: $primary-violet;
  border-color: $primary-violet;

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

.page-link.active,
.active>.page-link {
  color: $primary-violet;
  background-color: $primary-green;
  border-color: $primary-violet;
}

.alert {
  background-color: $primary-violet;
  color: white;
}
</style>
