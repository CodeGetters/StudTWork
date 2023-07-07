import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "virtual:uno.css";

import "@unocss/reset/normalize.css";

const app = createApp(App);

app.mount("#app");
