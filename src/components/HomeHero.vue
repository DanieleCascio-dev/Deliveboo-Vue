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
    <div class="wave-container">
      <svg
        class="wave-1hkxOo"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          class="wavePath-haxJK1 animationPaused-2hZ4IO"
          d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
          fill="#743c82"
        ></path>
      </svg>
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
  position: relative;
  @include response("sm") {
    min-height: 300px;
  }
  svg {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: -5px;
    left: 0;
    @include response("sm") {
      height: 40px;
      bottom: -5px;
    }
  }
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
        @include response("sm") {
          position: initial;
          max-width: 430px;
        }
        @include response("l") {
          max-width: 500px;
        }
      }
    }
    .col-12 {
      height: 350px;
      color: #743c82;
      text-align: center;
      @include response("sm") {
        min-height: 300px;
      }
      h1 {
        font-size: 55px;
        line-height: 114%;
        font-weight: 700;
        letter-spacing: 1px;
        position: relative;
        z-index: 10;
        @include response("sm") {
          font-size: 35px;
          line-height: 130%;
          text-align: end;
        }

        span {
          color: white;
          @include response("sm") {
            color: inherit;
          }
        }
      }
      h2 {
        font-size: 35px;
        line-height: 114%;
        font-weight: 500;
        letter-spacing: 1px;
        @include response("sm") {
          font-size: 25px;
          line-height: 120%;
          text-align: right;
        }
      }
    }
  }
}
// }
</style>
