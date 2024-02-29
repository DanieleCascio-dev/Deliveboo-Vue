<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<template>
    <div class="container">

        <div class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center row">

                <div class=" col-md-6">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNRbF2c1k9SnwBoDcwhVREGcK9xWuSUCamRQ&usqp=CAU"
                        alt="" class="img-fluid" style="height: 250px">
                </div>

                <div class=" col-md-6 mt-5">
                    <p class="fs-3"> <span class="ms_color">Opps!</span> Page not found.</p>
                    <p class="lead">
                        The page you're looking for doesn't exist.
                    </p>
                    <router-link :to="{name: 'home'}" class="nav-link"><a href="" class="btn btn-home">Go Home</a></router-link> 
                </div>

            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
@use "../style/partials/variables" as *;


    .ms_color {
        color: $primary-violet;
    }
    .btn-home {
        color: white;
        background-color: $primary-violet;
    }


</style>