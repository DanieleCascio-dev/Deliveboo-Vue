<script>
import { store } from '../store';
import axios from 'axios';
export default {
data(){
return{
 store,
 restaurants: [],
 categories:[],
 text: "",
 checkedCategories: [],
};
},
created(){
    axios.get(`${this.store.baseUrl}/api/restaurants`)
    .then((resp) =>{
        console.log(resp);
        this.restaurants=resp.data.results.data;

    });
    axios.get(`${this.store.baseUrl}/api/categories`)
    .then((resp) =>{
        this.categories=resp.data.results;
    
    });

},
methods:{
    // searchText(){
    //     axios.get(`${this.store.baseUrl}/api/restaurants/` ,{
    //     params:
    //     {
    //         search:this.text
    //     }
    //     }
            
    //     )
    //     .then((resp)=> {
    //         console.log(resp.data.results);
    //         console.log(this.text);
    //     })
    // }

    check(){
        console.log(this.checkedCategories[0]);
        axios.get(`${this.store.baseUrl}/api/restaurants`,{
            params:{
                category_id: this.checkedCategories
            }
        })
        .then((resp)=> {
           this.restaurants= resp.data.results.data
        })

    }
    }
}
</script>
<template>
  
    <div class="form-check" v-for="category in categories" :key="category.id">
        <div class="form-check">
        <input class="form-check-input" @change="check" v-model="checkedCategories" type="checkbox" :value="category.id" :id="category.name">
        <label class="form-check-label" :for="category.name">
            {{category.name}}
  </label>
</div>
    </div>
    
    <!-- <input type="text" v-model.trim="text" @keyup="searchText()"> -->
  <div v-for="restaurant in restaurants " :key="restaurant.id">
    <h2>{{ restaurant.name }}</h2>
  </div>
</template>

<style lang="scss" scoped>

</style>