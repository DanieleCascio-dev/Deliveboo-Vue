<script>
import axios from "axios";
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
      amount: 0,
      userName: "",
      userAddress: "",
      userPhone: "",
      cartArray: [],
    };
  },
  mounted() {
    this.setupBraintree();
    Object.keys(localStorage).forEach((key) => {
      this.cartArray.push(JSON.parse(localStorage.getItem(key)));
    });
    this.addToTotal();
    console.log(this.cartArray);
  },
  methods: {
    async setupBraintree() {
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
            amount: this.amount, // Specifica l'importo da addebitare
            customer_name: this.userName,
            customer_address: this.userAddress,
            customer_phone: this.userPhone,
            cart: this.cartArray,
          };
          axios
            .post("http://127.0.0.1:8000/api/orders/payment", data)
            .then((resp) => {
              console.log("Risposta dal server:", resp.data);
              // Gestisci la risposta dal server come desideri
              if (resp.data.results) {
                //Svuoto il carrello
                this.clear();
                // PORTA UTENTE IN UN'ALTRA PAGINA
              }
            })
            .catch((error) => {
              console.error("Errore durante la richiesta di pagamento:", error);
            });
        }
      );
    },
    addToTotal() {
      console.log("aggiorno il prezzo");
      this.cartArray.forEach((meal) => {
        this.amount += meal.price * meal.quantity;
      });
      return;
    },
    clear() {
      localStorage.clear();
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
  <h2>payment</h2>
  <form>
    <div class="mb-3">
      <label for="name" class="form-label">Your name</label>
      <input v-model="userName" type="text" id="name" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="address" class="form-label">Your address</label>
      <input
        v-model="userAddress"
        type="text"
        id="address"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="phone" class="form-label">Your phone</label>
      <input
        v-model="userPhone"
        type="number"
        id="phone"
        class="form-control"
      />
    </div>
  </form>
  <div id="dropin-container"></div>
  <button
    type="submit"
    id="submit-button"
    @click="processPayment"
    class="button button--small button--green"
  >
    Purchase
  </button>

  <!-- <v-braintree
    authorization="xxxxxxxxxxxxxxxxxxxxxx"
    @success="onSuccess"
    @error="onError"
  /> -->
</template>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}
</style>
