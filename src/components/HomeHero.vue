<script>
export default {};
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="row flex-column flex-sm-row">
        <div class="col-12 col-sm-6 _hero-img">
          <img src="../assets/img/Hero_img.png" alt="" />
        </div>
        <div class="col-12 col-sm-6">
          <h1 class="mt-5">
            Fr<span>esh,delici</span>ous food,whenever you want it.
          </h1>
          <h2 class="mt-5">Sit back and relax, we'll take care of the rest.</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;

/* * {
  border: 1px dashed gray;
} */

// @include response("sm") {
.wrapper {
  background-color: $primary-green;
  min-height: 800px;
}
.container {
  .row {
    flex-direction: column;
    ._hero-img {
      display: flex;
      align-items: end;
      position: relative;
      img {
        position: absolute;
        bottom: -117px;
        left: 45px;
        max-width: calc(100% - 45px);
        z-index: 9;
      }
    }
    .col-12 {
      height: 350px;
      color: #743c82;
      text-align: center;
      h1 {
        font-size: 55px;
        line-height: 114%;
        font-weight: 700;
        letter-spacing: 1px;
        position: relative;
        z-index: 10;

        span {
          color: white;
        }
      }
      h2 {
        font-size: 35px;
        line-height: 114%;
        font-weight: 500;
        letter-spacing: 1px;
      }
    }
  }
}
// }

@include response("md") {
}
</style>
