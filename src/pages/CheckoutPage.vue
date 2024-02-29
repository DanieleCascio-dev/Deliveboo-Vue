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
      loading: false,
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
  <div class="container-fluid py-5">
    <div class="container">
      <h2 class="text-center py-2">Checkout</h2>
      <div class="row">
        <form
          @submit.prevent="setupBraintree"
          class="col-8"
          v-if="!clientToken"
        >
          <div class="mb-3">
            <label for="name" class="form-label">Your name</label>
            <input
              v-model.trim="userName"
              type="text"
              id="name"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">Your address</label>
            <input
              v-model.trim="userAddress"
              type="text"
              id="address"
              class="form-control"
              required
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Your phone</label>
            <input
              v-model.trim="userPhone"
              type="number"
              id="phone"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Your email</label>
            <input
              v-model.trim="userEmail"
              type="email"
              id="email"
              class="form-control"
              required
            />
          </div>

          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style="height: 100px"
              v-model="customerNote"
            ></textarea>
            <label for="floatingTextarea2">Comments</label>
          </div>
          <button type="submit" class="btn my-3">Save</button>
        </form>
        <div v-if="clientToken" class="col-8">
          <div id="dropin-container"></div>
          <button
            type="submit"
            id="submit-button"
            @click="processPayment()"
            class="btn mb-3"
          >
            Purchase
          </button>
        </div>
        <div class="col-4">
          <!-- CART -->
          <div class="cart">
            <ul>
              <li v-for="product in storageMeal">
                <h4>
                  Name: {{ product.name }}
                  <span
                    ><button class="btn" @click="removeAndShow(product)">
                      X
                    </button></span
                  >
                </h4>

                <p>Price: {{ product.price }}</p>
                <p>Quantity: {{ product.quantity }}</p>
                <!-- <p>
          <strong>Restaurant: </strong>
          {{ product.restaurant }}
        </p> -->
              </li>
            </ul>
            <h4>Tot: {{ totPrice }}</h4>
            <button class="btn" @click="clearAndShow()">Clear</button>
          </div>
          <!-- END CART -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;

.btn {
  background-color: $primary_violet;
  border-color: $primary_violet;
  color: white;

  &:hover {
    background-color: $primary_violet;
    color: white;
  }

  &:active {
    background-color: $primary_violet !important;
    color: white !important;
  }
}
</style>
