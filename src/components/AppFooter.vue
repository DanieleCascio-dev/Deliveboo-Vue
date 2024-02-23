<script>
export default {

}
</script>

<template>
   <div class="text-center top_container  justify-content-center">
    <img src="../assets/img/DELIVEBOO.svg" alt="logo">
    <div class="d-flex  justify-content-center gap-5">
        <p><a class="a_top" href="">About us</a></p>
        <p><a class="a_top" href="">Contact us</a></p>
    </div>
  </div>

  <div class="text-center bot_container  justify-content-center">
    <div class=" d-flex justify-content-center gap-4 pt-3">
        <span><a href=""> <i class="fa-brands fa-instagram fa-2xl"></i></a></span>
        <span><a href=""><i class="fa-brands fa-facebook fa-2xl"></i></a></span>
        <span><a href=""><i class="fa-brands fa-twitter fa-2xl"></i></a></span>
    </div>
    <div class="pt-3 " >
        <p class="mb-0">Via Roma, 52 20125 Milano -</p>
        <p><a href="">infodeliveboo.it</a> - C.F. e P.Iva: 00009070284</p>
        <h3>DELIVEBOO S.R.L.</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top_container{
background-color: #81548C;    
    img{
    max-width: 250px;
    min-width: 100px;
    }
    .a_top{
        text-decoration: none;
        color: #ADD8B5;
    }
}

.bot_container{
background-color: #ADD8B5;
    span{
        color: #81548C;
    }
    a,p,h3{
        text-decoration: none;
        color: #743C82;
    }
    a,p{
        font-size: .8rem;
    }
    
}

   
</style>