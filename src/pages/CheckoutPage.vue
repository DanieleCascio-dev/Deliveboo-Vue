<script>
import axios from "axios";
import { store, clear, showStorage, addToTotal, removeMeal } from "../store";
/* import { braintree } from "../braintree"; */

/* export default {
  data() {
    return {
      userToken: "",
      instance: null,
      amount: 12,
      userName: "",
    };
  },
  methods: {
    braintree(data) {
      braintree.dropin.create(
        {
          authorization: this.userToken,
          container: "#dropin-container",
        },

        function (err, instance) {
          const button = document.querySelector("#submit-button");
          button.addEventListener("click", function () {
            instance.requestPaymentMethod(function (err, payload) {
              // Submit payload.nonce to your server
              console.log(payload.nonce);
              const data = { token: payload.nonce, amount: 12 };
              axios
                .post(`http://127.0.0.1:8000/api/orders/payment`, data)
                .then((resp) => {
                  console.log(resp.data);
                });
            });
          });
        }
      );
    }, */
export default {
  data() {
    return {
      clientToken: "",
      totPrice: 0,
      userName: "",
      userAddress: "",
      userPhone: "",
      storageMeal: [],
      userEmail: "",
      currRestaurant: null,
      customerNote: "",
      disableButtons: false,
      loading: false,
      isFlipped: false,
      store,
      divDisplay: 'none'
    };
  },
  mounted() {
    Object.keys(localStorage).forEach((key) => {
      this.storageMeal.push(JSON.parse(localStorage.getItem(key)));
    });
    showStorage(this.storageMeal);
    this.totPrice = addToTotal(this.storageMeal);
    console.log(this.totPrice);
    console.log(localStorage);
  },
  methods: {
    async setupBraintree() {
      this.disableButtons = true
      this.loading = true;
      const clientTokenResponse = await axios
        .get("http://127.0.0.1:8000/api/orders/token")
        .then((resp) => {
          console.log(resp);
          this.clientToken = resp.data.token;
        });

      braintree.dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
        },
        (createErr, instance) => {
          if (createErr) {
            console.error(
              "Errore durante la creazione di Braintree Drop-in:",
              createErr
            );
            return;
          }
          this.dropinInstance = instance;
          this.loading = false;
        }
      );
    },
    async processPayment() {
      this.dropinInstance.requestPaymentMethod(
        (requestPaymentMethodErr, payload) => {
          if (requestPaymentMethodErr) {
            console.error(
              "Errore durante la richiesta del metodo di pagamento:",
              requestPaymentMethodErr
            );
            return;
          }
          const data = {
            token: payload.nonce,
            amount: (this.totPrice = addToTotal(this.storageMeal)), // Specifica l'importo da addebitare
            customer_name: this.userName,
            customer_address: this.userAddress,
            customer_phone: this.userPhone,
            customer_email: this.userEmail,
            customer_note: this.customerNote,
            cart: this.storageMeal,
          };
          axios
            .post("http://127.0.0.1:8000/api/orders/payment", data)
            .then((resp) => {
              console.log("Risposta dal server:", resp.data);
              // Gestisci la risposta dal server come desideri
              if (resp.data.results) {
                //Svuoto il carrello
                clear();
                // PORTA UTENTE IN UN'ALTRA PAGINA
                this.$router.push("/thank-you");
              }
            })
            .catch((error) => {
              console.error("Errore durante la richiesta di pagamento:", error);
            });
        }
      );
    },
    clearAndShow() {
      console.log("clearAndShow");
      clear();
      this.storageMeal = [];
      showStorage(this.storageMeal);
      this.totPrice = addToTotal(this.storageMeal);
      console.log(localStorage);
    },
    removeAndShow(product) {
      removeMeal(product);
      this.storageMeal = showStorage(this.storageMeal);
      this.totPrice = addToTotal(this.storageMeal);
    },
    addToCart(meal) {
      if (localStorage.getItem(meal.name)) {
        let dish = 0;
        console.log(dish, "lo setto a 0");
        dish = JSON.parse(localStorage.getItem(meal.name)).quantity;
        console.log(dish, meal.name, "lo setto alla quantità del piatto");
        localStorage.setItem(
          meal.name,
          JSON.stringify({
            id: meal.id,
            name: meal.name,
            image: meal.image,
            description: meal.description,
            price: parseFloat(meal.price),
            quantity: dish + 1,
            restaurant_id: meal.restaurant_id,
            restaurant:
             meal.restaurant,
          })
        );
      } else {
        localStorage.setItem(
          meal.name,
          JSON.stringify({
            id: meal.id,
            name: meal.name,
            image: meal.image,
            description: meal.description,
            price: parseFloat(meal.price),
            quantity: 1,
            restaurant_id: meal.restaurant_id,
            restaurant: meal.restaurant_id,
          })
        );
      }
      this.storageMeal = showStorage(this.storageMeal);
      this.totPrice = addToTotal(this.storageMeal);
    },  
    disabled(){
      if (this.clientToken) {
        this.disableButtons = false;
      }
    },
    flipCard() {
          this.isFlipped = !this.isFlipped;
        },
    backToRestaurant() {
      this.$router.push("/restaurants")
    }
    

    // rotate(){
    //  if (this.clientToken.length == false ) {
    //   this.isFlipped = !this.isFlipped;
    //   setTimeout(() => {
    //     this.isFlipped = true;
    //     this.clientToken =true;
    //   }, 5000); 
    //  }else{
    //   this.clientToken = false;
    //   this.isFlipped = false;
    //  }   
    // }
  },
};
/*  payment(err, instance) {
      console.log("ciao");
      instance.requestPaymentMethod(function (err, payload) {
        // Submit payload.nonce to your server
        console.log(payload.nonce);
        axios.post("http://127.0.0.1:8000/api/orders/payment", {
          params: {
            token: payload.nonce,
          },
        });
      });
    }, */

/*   created() {
    axios
      .get("http://127.0.0.1:8000/api/orders/token")
      .then((resp) => {
        this.userToken = resp.data.token;
        console.log(this.userToken);
      })
      .finally(() => {
        this.braintree(this.amount);
      });
  },
}; */
</script>

<template>
  <div class="container">
    <div class="checkoutLayout" >

      <!-- form part  -->
       <div class="left" :class="{ 'flipped': isFlipped }">
        <div class="card-front">
          <form @submit.prevent="setupBraintree">
            <h2 class="text-center ">Your details</h2>
            <div class="group">
              <label for="name" class="form-label">Full Name</label>
              <input v-model.trim="userName" type="text" id="name" class="form-control" required />
            </div>

            <div class="group">
              <label for="address" class="form-label">Your address</label>
              <input v-model.trim="userAddress" type="text" id="address" class="form-control" required />
            </div>

            <div class="group">
              <label for="phone" class="form-label">Your phone</label>
              <input v-model.trim="userPhone" type="number" id="phone" class="form-control" required />
            </div>

            <div class="group">
              <label for="email" class="form-label">Your email</label>
              <input v-model.trim="userEmail" type="email" id="email" class="form-control" required />
            </div>

            <div class="">
              <label for="floatingTextarea2">Comments</label>
              <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"
                v-model="customerNote"></textarea>
            </div>

            <hr class="mt-4">

            <div class="return">
            <div class="d-flex justify-content-between">
              <p>Total Price</p>
              <h5>{{ totPrice }}€</h5>
            </div>
          </div>
          <button type="submit" class="buttonCheckout" >Checkout</button>
            
          </form> 
        </div>
        <!-- back  -->
        <div class="card-back">
          <div class="" v-if="clientToken">
        <h2 id="my_list" class="text-center mb-5">{{ storageMeal[0].restaurant }}</h2>
        <div class="" v-if="storageMeal.length > 0">
          <div class="item2" v-for="product in storageMeal">
                <img v-if="product.image"
                    :src="
                      product.image.includes('http')
                        ? product.image
                        : `${store.baseUrl}/storage/${product.image}`
                    " alt="image">
                <div class="info" >
                  <h5 class="name"> {{ product.name }}</h5>
                  <p class="price mb-0">Price: {{ product.price }}&euro;</p> 
                  <div class="d-flex align-items-start">
                  <p class="quantity ps-0">Quantity: {{ product.quantity }}</p> 
                </div>                       
                </div>     
          </div>
        </div>
      </div> 
        </div>
      </div>

      <!-- credit card data  -->
      <div v-if="clientToken" class="card-payment">
          <h2 class="text-center title-right">Checkout</h2>
          <div v-if="clientToken" class="col-12 payment">
              <div id="dropin-container"></div>
              
              <button type="submit" id="submit-button" @click="processPayment()" class="mb-3 buttonCheckout">
                Purchase
              </button>
              <button class="back_list" @click="flipCard"><a class="btn_list" href="#my_list">List Orders</a></button>
          </div>
        </div> 

        <!-- product cart  -->
    <div class="returnCart" v-else>
        <div class="list" v-if="storageMeal.length > 0">
          <h2 class="text-center">{{ storageMeal[0].restaurant }}</h2>
          <div class="item" v-for="product in storageMeal">
                <img v-if="product.image"
                    :src="
                      product.image.includes('http')
                        ? product.image
                        : `${store.baseUrl}/storage/${product.image}`
                    " alt="image">
                <div class="info" >
                  <h5 class="name"> {{ product.name }}</h5>
                  <p class="price mb-0">Price: {{ product.price }}&euro;</p> 
                  <div class="d-flex align-items-start">
                  <p class="quantity ps-0">Quantity: {{ product.quantity }}</p> 
                  <button class="modifyQuantity me-1" id="modifyQuantity" @click="removeAndShow(product),disabled()" :disabled="disableButtons"><i data-v-5d85e2ed="" class="fa-solid fa-minus"></i></button>
                  <button class="modifyQuantity" id="modifyQuantity" @click="addToCart(product),disabled()" :disabled="disableButtons"><i data-v-5d85e2ed="" class="fa-solid fa-plus"></i></button>   
                </div>                          
                </div>
                     
          </div>
        </div>
        <!-- se l'ordine è vuoto  -->
        <!-- <div v-else>
          <button @click="backToRestaurant()">torna restaurantPage</button>
        </div> -->
      </div> 
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use '../style/partials/mixin' as *;

.container{
  min-height: 66vh;
  position: relative;
  @include response("md") {
   min-width: 800px;
    
 }
}
.checkoutLayout{
  @include response("md") {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
 }
}

.checkoutLayout .left{
  background-color: $primary-violet;
  border: 2px solid $primary-violet;
  border-radius: 20px;
  padding: 2rem;
  color: white;
  margin: 1rem;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  position: relative;
}
.left.flipped {
      transform: rotateY(180deg);
}

.card-front{
  backface-visibility: hidden;
  transform: rotateY(0deg);
  
}

// list meal back-card 
.card-back {
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  position: absolute;
  top: 0;
  right: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom:1rem ;
  margin: 1rem, 1rem, 0, 1rem;
  position: absolute;
  overflow-y: scroll;

    h2{
      padding-top: 2rem;
    }
  
    .item2{
      height: 100%;
      background-color: white;
      display: flex;
    max-height: 6rem;
    gap: 1rem;
    padding: 0.5rem;
    margin-bottom: 2rem;
    border-radius: 10px;
    } 

    img{
      max-width: 60%;
      @include response("md") {
        max-width: 25%;
        object-fit: cover;

      }
      @include response("l") {
        max-width: 10%;
        object-fit: cover;
      }
      }
}

// form user 
input,textarea {
  border-radius: 20px;
  border: none;
}

textarea{
  display: block;
}

.buttonCheckout{
  width: 100%;
  height: 40px;
  border:none;
  border-radius: 20px;
  margin-top: 20px;
  font-weight: bold;
  background-color: $primary-green;
  color: $primary-violet;
}

.return h5{
  color: white;
}

.return p{
  color: white;
}


// list meal 

.returnCart{
  margin: 0, 2rem;
  
  @include response("md") {
    display: block;
  }
}

.returnCart h2{
  border-top: 1px solid $primary-violet ;
  padding: 1rem;
}

.total-price{
  color: white;
}

.returnCart h2,h5,p{
  color: $primary-violet;
}

.info p{
  color: $primary-violet;
}

.checkoutLayout .list img{
  height: 70px;
  object-fit: cover;
  aspect-ratio: 4/3;
  
}

// product

.item{
  display: flex;
  min-height: 5rem;
  gap: 1rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1rem 2rem $primary-violet;
  border-radius: 10px;
}
.card-payment h5,.price{
  color: white;
}

.modifyQuantity{
  border: none;
  background-color: #743c82;
  border-color: #743c82;
  color: white;
  border-radius: 5px;
}
.quantity{
padding-left: 0.5rem;
padding-right:0.5rem ;
}


// payment card 
.card-payment{
  background-color: $primary-violet;
  border-radius: 20px;
  padding: 1rem;
  color: white;
  margin: 1rem;
}

.back_list{
  background-color: white;
  border-radius: 10px;
}
.btn_list{
  text-decoration: none;
  color: $primary-violet;
}




</style>
