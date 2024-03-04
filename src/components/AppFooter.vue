<script>
export default {};
</script>

<template>
  <!-- footer top  -->
  <div class="top_container">
    <!--<img src="../assets/img/DELIVEBOO.svg" alt="logo" />-->
    <router-link :to="{ name: 'home' }" class="nav-link"><img src="../assets/img/DELIVEBOO.svg" alt="logo"></router-link>
    <div class="d-flex justify-content-center gap-3 fs-4 link">
      <a target="_blank" class="a_top" href="">About us</a>
      <a target="_blank" class="a_top" href="http://127.0.0.1:8000"
        >Work with us</a>
    </div>
  </div>

  <!-- footer bottom  -->
  <div class="bot_container flex-sm-row-reverse px-3">
    <div class="d-flex justify-content-center gap-4 pt-3 icons">
      <!-- icons -->
      <a href=""> <i class="fa-brands fa-instagram fa-2xl"></i></a>
      <a href=""><i class="fa-brands fa-facebook fa-2xl"></i></a>
      <a href=""><i class="fa-brands fa-twitter fa-2xl"></i></a>
    </div>

    <div class="pt-3 text-center">
      <p class="mb-0">Via Roma, 52 20125 Milano -</p>
      <p><a href="">infodeliveboo.it</a> - C.F. e P.Iva: 00009070284</p>
    </div>
    <h3 class="m-0 text-center">DELIVEBOO S.R.L.</h3>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;
.top_container {
  //height: 11vh;
  background-color: $secondary-violet;
  text-align: center;
  justify-content: center;

  @include response("md"){
     //height: 10vh;
     display: flex;
     justify-content: space-between;
     .link{
      padding-top: 5%;
      padding-right: 20px;
     }
  }
  img {
    width: 250px;
    padding-top: 0;

    @include response("md"){
      width: 250px;
      padding-top: 10px;
    }
    
  }
  .a_top {
    text-decoration: none;
    color: $white;
    .a_top:hover {
      color: $primary-green;
    }
  }
  @include response("sm") {
    a {
      height: 100%;
      align-self: baseline;
      padding-right: 1rem;
    }
    .a_top:hover {
      color: $primary-green;
    }
  }
}

.bot_container {
  background-color: $primary-green;
  height: 10vh;
  @include response("md"){
    //height: 7vh;
}
  .icons {
    align-items: stretch;
  }
  span {
    color: $secondary-violet;
  }
  a,
  p,
  h3 {
    text-decoration: none;
    color: $primary-violet;
  }
  a,
  p {
    font-size: 0.8rem;
  }

  @include response("sm") {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      align-self: center;
    }

    a {
      padding-bottom: 1rem;
    }
  }
}
</style>
