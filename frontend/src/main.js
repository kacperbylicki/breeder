import "./styles/index.css";
import App from "./App.vue";
import { createApp } from "vue";
import { router } from "./router";
import { setupInterceptors } from "./services";
import { store } from "./store";

setupInterceptors();

createApp(App).use(router).use(store).mount("#app");
