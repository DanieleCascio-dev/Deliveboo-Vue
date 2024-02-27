<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-11 col-md-6 py-3 my-auto">
                <h2 class="text-center mb-4">Dowload our mobile App.</h2>
                <div class="button-download">
                    <a class="animate_btn" href="/" tabIndex="0"><img class="bn45"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                            alt="bn45" /></a>
                    <a  class="animate_btn" href="/" tabIndex="0"><img class="bn46"
                            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                            alt="bn45" /></a>
                </div>
            </div>
            <div class="col-11 col-md-6 pt-3">
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
        font-size: 3.5rem;
        color: $primary_violet;
    }

    .button-download {
        display: flex;
        gap: 2rem;
        justify-content: center;
    }

    .animate_btn{
        animation: btnbounce 4s infinite;
        cursor: pointer;
    }

    @keyframes btnbounce {
  5%,
  50% {
    transform: scale(1);
  }

  10% {
    transform: scale(1);
  }

  15% {
    transform: scale(1);
  }

  20% {
    transform: scale(1) rotate(-5deg);
  }

  25% {
    transform: scale(1) rotate(5deg);
  }

  30% {
    transform: scale(1) rotate(-3deg);
  }

  35% {
    transform: scale(1) rotate(2deg);
  }

  40% {
    transform: scale(1) rotate(0);
  }
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
    

    @media screen and (max-width: 375px) {
        .button-download {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
    }
}
</style>