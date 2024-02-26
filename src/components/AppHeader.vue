<script>
import RestaurantsPage from '../pages/RestaurantsPage.vue';

export default {
    data(){
        return{
            mobileView: false,
            showNav: false,
        }
    },
    methods: {
        toggleNavbar() {
            document.getElementById('navbar').classList.toggle('collapse');
        }
    }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg my_nav ">
  <div class="container-fluid">
    <img src="../assets/img/DELIVEBOO.svg" alt="logo">
    <div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNavbar">
            <span class=""><i class="fa-solid fa-bars fa-md" style="color: #ffffff;"></i></span>
        </button>
    </div>
    
    <div class="collapse navbar-collapse" id="navbar">
     
      <div class="d-flex ms-auto" role="search">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>  
            <li class="nav-item">
                <router-link to="/restaurants">restaurants</router-link>
            </li> 
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Cart</a>
            </li> 
        </ul>
      </div>
    </div>
  </div>
</nav>
</template>


<style lang="scss" scoped>
.my_nav{
background-color: #743C82;
    img{
    max-width: 250px;
    min-width: 10px;
    }
    li{
        a{
            color: white !important;
        }
    }
    button{
        border-color: white !important;      
    }
}

</style>