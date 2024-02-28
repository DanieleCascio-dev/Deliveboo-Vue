<script>
import axios from "axios";
/* import { braintree } from "../braintree"; */

export default {
  data() {
    return {
      userToken: "",
      instance: null,
    };
  },
  methods: {
    braintree() {
      const button = document.querySelector("#submit-button");
      braintree.dropin.create(
        {
          authorization: this.userToken,
          container: "#dropin-container",
        },
        function (err, instance) {
          button.addEventListener("click", function () {
            instance.requestPaymentMethod(function (err, payload) {
              // Submit payload.nonce to your server
              console.log(payload);
              axios
                .post("http://127.0.0.1:8000/api/orders/payment", {
                  params: {
                    paymentMethodNonce: payload.nonce,
                    /* customer_name: "pippo", */
                    amount: 12,
                  },
                })
                .then((resp) => {
                  console.log(resp.data);
                });
            });
          });
        }
      );
    },
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

    onSuccess(payload) {
      let nonce = payload.nonce;
      // Do something great with the nonce...
    },
    onError(error) {
      let message = error.message;
      // Whoops, an error has occured while trying to get the nonce
    },
  },
  created() {
    axios
      .get("http://127.0.0.1:8000/api/orders/token")
      .then((resp) => {
        this.userToken = resp.data.token;
        console.log(this.userToken);
      })
      .finally(() => {
        this.braintree();
      });
  },
};
</script>

<template>
  <h2>payment</h2>

  <div id="dropin-container"></div>
  <button id="submit-button" class="button button--small button--green">
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
  -webkit-appearance: none;
  -moz-appearance: none;
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
