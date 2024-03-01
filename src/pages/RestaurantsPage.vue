<script>
import RestaurantCard from "../components/RestaurantCard.vue";
import { store } from "../store";
import axios from "axios";
export default {
  data() {
    return {
      store,
      loading: false,
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
      this.loading = true;
      axios
        .get(`${this.store.baseUrl}/api/restaurants/`, {
          params: paramsToSend,
        })
        .then((resp) => {
          this.restaurants = resp.data.results.data;
          this.totPage = resp.data.results.last_page;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getCategories() {
      this.loading = true;
      axios
      .get(`${this.store.baseUrl}/api/categories`)
      .then((resp) => {
        this.categories = resp.data.results;
      })
      .finally(() => {
        this.loading = false;
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
      this.searchText = "";
      this.getRestaurants(1);
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
  components: { RestaurantCard },
};
</script>
<template>
  <!-- section of restaurants -->
  <div class="container-fluid">

    <!-- loading container -->
    <div v-if="loading">
      <div id="preloader"></div>
    </div>
    <div v-else>
       <!-- container search bar  -->
       <div class="row justify-content-center pb-1">
        <div class="col-10 position-relative d-flex justify-content-end my-4">
          <!-- search bar  -->
          <label for="search" class="visually-hidden">Search Restaurant</label>
          <input type="text" v-model.trim="searchText" @keyup.enter="getRestaurants(1)" id="search" class="form-control"
            placeholder="Search Restaurant" />
            <!-- search btn  -->
          <button @click="getRestaurants(1)" class="search-button">
            <i class="fa-solid fa-magnifying-glass fa-lg"></i>
          </button>
        </div>
      </div>

      <!-- categories container -->
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 py-2">
        <!-- categories col  -->
        <div class="form-check col p-0" v-for="category in categories" :key="category.id">
          <div class="d-flex justify-content-center mb-2">

            <!-- single category  -->
            <input class="form-check-input hidden" :checked="checked(category.id)" @change="getRestaurants(1)"
              v-model="checkedCategories" type="checkbox" :value="category.id" :id="category.name" />
            <label class="form-check-label" :for="category.name">
              {{ category.name }}
            </label>

          </div>
        </div>
      </div>
      <hr>

      <!-- biggest container restaurants  -->
      <div class="container container-restaurants">
        <!-- container restauranturants  -->
        <div v-if="restaurants.length > 0" class="py-3 container_cards" v-for="restaurant in restaurants" :key="restaurant.id" >
          <router-link style="text-decoration: none" class="ciao"
            :to="{ name: 'single-restaurant', params: { slug: restaurant.slug } }">
            <!-- card componens  -->
            <RestaurantCard :restaurant="restaurant"/>
          </router-link>
        </div>

        <!-- container of div of messagege not found  -->
        <div v-else class="py-3" >
          <div class="alert alert-dismissible">
            <strong>No Restaurants found! </strong>Try another filter.
            <button type="button" @click="cleanFilter" class="btn-close">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- biggest container of impagination  -->
      <nav class="pb-3" aria-label="Result page for projects">

        <!-- container impagination -->
        <ul class="pagination justify-content-end m-0">
          <li class="page-item" :class="{ disabled: curPage === 1 }">

            <!-- btn back  -->
            <a tabindex="-1" class="page-link" href="" @click.prevent="getRestaurants(curPage - 1), scrollToTop()"><i
                class="fa-solid fa-left-long"></i></a>
          </li>
          <li v-for="page in totPage" class="page-item" :class="{ active: page === curPage }">
            <!-- btn numbers  -->
            <a class="page-link" href="" @click.prevent="getRestaurants(page), scrollToTop()">{{ page }} </a>
          </li>
          <li class="page-item" :class="{ disabled: curPage === totPage }">
            <!-- btn forward  -->
            <a tabindex="-1" class="page-link" href="" @click.prevent="getRestaurants(curPage + 1), scrollToTop()"><i
                class="fa-solid fa-right-long"></i></a>
          </li>
        </ul>
      </nav>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;

.container-fluid {
  background-color: $primary-green;
  min-height: 67vh;
}

#preloader{
  background: transparent url('../assets/loading.gif') no-repeat center center;
  height: 100vh;
  width:100%;
  position: fixed;
  bottom: 100px;
  z-index: 100;
}
.hidden {
  position: absolute;
  visibility: hidden;
  opacity: 0;
}

input[type="checkbox"]+label {
  color: $primary-violet;
  border: 1px solid #743c82;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-style: italic;
  width: 120px;
  text-align: center;
}

input[type="checkbox"]:checked+label {
  color: white;
  background: $primary-violet;
  transition: 0.3s
  /*  font-style: normal; */
}

hr{
  border: 1px solid $primary-violet;
}

input[type="text"] {
  color: $primary-violet;
  background-color: white;
  padding-right: 100px;
  height: 40px;

  &:focus {
    border-color: $primary-violet;
    box-shadow: 0 0 0 0.25rem $primary-green;
  }

  &::placeholder {
    color: $primary-violet;
  }
}

#search {
  max-width: 400px;
}

.search-button {
  position: absolute;
  right: 12px;
  top: 0;
  background-color: $primary-violet;
  border-radius: 0.375rem;
  border: 0;
  color: white;
  width: 90px;
  height: 40px;
  outline: 0;
}

.container-restaurants{
  @include response("l") {
      width:100%; 
      position: relative; 
      left: 0;

      .container-restaurants:hover{
        background-color: red;
      }
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

  .btn-close {
    background-image: none;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5px;
    padding-right: 5px;
    color: white;
    opacity: 1;

    &:focus {
      box-shadow: none;
    }
  }
}
</style>
