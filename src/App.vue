<script>

export default{


  data() {
    return{

    }
  },
  components: 
  {},
}
</script>

<template>



  <router-view></router-view>

  
    <h2 class="mt-5">DELIVEBOO</h2>
    <i class="fa-solid fa-magnifying-glass"></i>
    <router-view></router-view>


</template>

<style lang="scss">
@use "./style/general.scss" as *;
@import "@fortawesome/fontawesome-free/css/all.css";
</style>
