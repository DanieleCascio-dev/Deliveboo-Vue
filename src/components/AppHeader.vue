<script>
export default {
    data() {
        return {
            links: [
                {
                    name: 'home',
                    title: 'Home'
                },
                {
                    name: 'restaurants',
                    title: 'Restaurants'
                },

            ]
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
    <nav class="navbar navbar-expand-lg my_nav">
        <div class="container-fluid">
            <router-link :to="{ name: 'home' }" class="nav-link"><img src="../assets/img/DELIVEBOO.svg"
                    alt="logo"></router-link>
            <div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar"
                    aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation"
                    @click="toggleNavbar">
                    <span class=""><i class="fa-solid fa-bars fa-md" style="color: #ffffff;"></i></span>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="navbar">

                <div class="d-flex ms-auto" role="search">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item" v-for="link in links">
                            <router-link :to="{ name: link.name }" class="nav-link">{{ link.title }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>


<style lang="scss" scoped>
@use "../style/partials/mixin" as *;

.my_nav {
    height: 15vh;
    background-color: #743C82;

    img {
        width: 250px;


        @include response("sm") {
            max-width: 250px;
            min-width: 100px;
        }
    }

    li {
        a {
            color: white !important;
        }
    }

    button {
        border-color: white !important;
    }
}</style>