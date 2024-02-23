<script>
export default {};
</script>

<template>
  <div class="wrapper">
    <div class="container-sm">
      <div class="row flex-column flex-sm-row">
        <div class="col-12 col-sm-6">
          <img src="../assets/img/Hero_img.png" alt="" />
        </div>
        <div class="col-12 col-sm-6">
          <h1>Fresh,delicious food,whenever you want it.</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;

* {
  border: 1px dashed gray;
}

@include response("sm") {
  .wrapper {
    background-color: $primary-green;
    min-height: 1000px;
  }
  .container-sm {
    height: 100%;
    .row {
      height: 100%;
    }
  }
}

@include response("md") {
  .wrapper {
    background-color: $primary-green;
    min-height: 300px;

    .container-sm {
      height: 100%;
      .row {
        height: 300px;
        position: relative;

        .col-sm-6 {
          height: 300px;
          /* width: 100%; */
          img {
            width: 450px;
            position: absolute;
            bottom: -15px;
            left: -45px;
          }
        }
      }
    }
  }
}
</style>
