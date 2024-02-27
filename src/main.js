import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
/* import bootstrap from "bootstrap"; */
import "bootstrap";

createApp(App).use(router).mount("#app");
