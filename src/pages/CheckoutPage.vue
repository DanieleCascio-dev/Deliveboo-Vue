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
    };
  },
  mounted() {
    this.setupBraintree();
    Object.keys(localStorage).forEach((key) => {
      this.storageMeal.push(JSON.parse(localStorage.getItem(key)));
    });
    showStorage(this.storageMeal);
    this.totPrice = addToTotal(this.storageMeal);
    console.log(this.totPrice);
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
            Amount: this.totPrice, // Specifica l'importo da addebitare
            customer_name: this.userName,
            customer_address: this.userAddress,
            customer_phone: this.userPhone,
            cart: this.storageMeal,
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
  <h2>payment</h2>
  <!-- CART -->
  <div class="cart">
    <ul>
      <li v-for="product in storageMeal">
        <h4>
          Name: {{ product.name }}
          <span
            ><button class="btn btn-danger" @click="removeAndShow(product)">
              X
            </button></span
          >
        </h4>

        <p>Price: {{ product.price }}</p>
        <p>Quantity: {{ product.quantity }}</p>
        <p>
          <strong>Restaurant: </strong>
          {{ product.restaurant }}
        </p>
      </li>
    </ul>
    <h4>Tot: {{ totPrice }}</h4>
    <button class="btn btn-danger" @click="clearAndShow()">Clear</button>
  </div>
  <!-- END CART -->
  <form>
    <div class="mb-3">
      <label for="name" class="form-label">Your name</label>
      <input
        v-model="userName"
        type="text"
        id="name"
        class="form-control"
        required
      />
    </div>
    <div class="mb-3">
      <label for="address" class="form-label">Your address</label>
      <input
        v-model="userAddress"
        type="text"
        id="address"
        class="form-control"
        required
      />
    </div>
    <div class="mb-3">
      <label for="phone" class="form-label">Your phone</label>
      <input
        v-model="userPhone"
        type="number"
        id="phone"
        class="form-control"
        required
      />
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Your email</label>
      <input
        v-model="userEmail"
        type="email"
        id="email"
        class="form-control"
        required
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
