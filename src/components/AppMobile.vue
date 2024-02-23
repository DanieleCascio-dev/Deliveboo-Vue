<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-11 py-3">
                <h2 class="text-center mb-4">Dowload our mobile App.</h2>
                <div class="d-flex flex-column gap-3 text-center">
                    <a href="/" tabIndex="0"><img class="bn45"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                            alt="bn45" /></a>
                    <a href="/" tabIndex="0"><img class="bn46"
                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="bn45" /></a>
                </div>
            </div>
            <div class="col-11 pt-3">
                <img class="app-img" src="../assets/AppMobile.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.container-fluid {
    background-color: $primary_green;

    h2 {
        font-size: 3rem;
        color: $primary_violet;
    }

    .bn45 {
        width: 150px;
        height: 50px;
    }

    .bn46 {
        width: 150px;
        height: 50px;
    }

    .app-img {
        position: relative;
        top: 7.8%;
    }
}
</style>