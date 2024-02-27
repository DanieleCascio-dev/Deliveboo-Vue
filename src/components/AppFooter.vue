<script>
export default {

}
</script>

<template>
   <div class="top_container ">
    <img src="../assets/img/DELIVEBOO.svg" alt="logo">
    <div class="d-flex  justify-content-center pe-4 gap-3">
        <a class="a_top " href="">About us</a>
        <a class="a_top" href="http://127.0.0.1:8000">Work with us</a>
    </div>
  </div>

  <div class="bot_container  flex-sm-row-reverse px-3">
    <div class=" d-flex justify-content-center gap-4 pt-3 icons">
        <a href=""> <i class="fa-brands fa-instagram fa-2xl"></i></a>
        <a href=""><i class="fa-brands fa-facebook fa-2xl"></i></a>
        <a href=""><i class="fa-brands fa-twitter fa-2xl"></i></a>
    </div>
    <div class="pt-3 text-center " >
        <p class="mb-0">Via Roma, 52 20125 Milano -</p>
        <p><a href="">infodeliveboo.it</a> - C.F. e P.Iva: 00009070284</p>
    </div>
     <h3 class="m-0 text-center">DELIVEBOO S.R.L.</h3>
    
  </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixin" as *;
.top_container{
background-color: #81548C;  
text-align: center; 
justify-content: center; 
    img{
    max-width: 250px;
    min-width: 100px;
    }
    
    .a_top{
        text-decoration: none;
        color:white;
        .a_top:hover{
            color: #ADD8B5;
        }
    }
    @include response("sm") {
          display: flex;
          align-items: center;
          justify-content: space-between;

          a{
           height: 100%;
           align-self: baseline;
          }
        .a_top:hover{
            color: #ADD8B5;
        }
    }
}

.bot_container{
background-color: #ADD8B5;
    .icons{
        align-items: stretch;
    }
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

    @include response("sm") {
          display: flex;
          align-items: center;
          justify-content: space-between;

          h3{
            align-self: center;
          }
          
          a{
            padding-bottom: 1rem;
          }      
    }
}

   
</style>