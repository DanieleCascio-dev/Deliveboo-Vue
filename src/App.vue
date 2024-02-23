<script>
import AppHeaderVue from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default{


  data() {
    return{

    }
  },
  components: 
  {AppHeaderVue, AppFooter},
}
</script>

<template>
<AppHeaderVue />
 
    <h2 class="mt-5">DELIVEBOO</h2>
    <i class="fa-solid fa-magnifying-glass"></i>
    <router-view></router-view>
    <AppFooter />
</template>

<style lang="scss">
@use "./style/general.scss" as *;
@import "@fortawesome/fontawesome-free/css/all.css";
</style>
