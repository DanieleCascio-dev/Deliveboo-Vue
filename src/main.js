import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
/* import bootstrap from "bootstrap"; */
import "bootstrap";

/* import vueBraintree from "vue-braintree"; */
import { braintree } from "braintree-web";

// main.js
// require.config({
//   paths: {
//     braintree: "https://js.braintreegateway.com/js/braintree-2.32.1.min",
//   },
// });

// require(["braintree"], function (braintree) {
//   braintree.setup("CLIENT-TOKEN-FROM-SERVER", "INTEGRATION_TYPE", options);
// });
/* var braintree = require("braintree-web"); */
/* 
var button = document.getElementById("submit-button");
console.log(button);

braintree.dropin.create(
  {
    authorization: "sandbox_zjstxv8q_7vgbrmwvqp5dfsrg",
    selector: "#dropin-container",
  },
  function (err, instance) {
    button.addEventListener("click", function () {
      instance.requestPaymentMethod(function (err, payload) {
        // Submit payload.nonce to your server
        axios.post("http://127.0.0.1:8000/api/orders/payment", { params: {} });
      });
    });
  }
);  */

createApp(App).use(router).use(braintree).mount("#app");
