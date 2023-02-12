import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import "normalize.css";
import registerProperties from "./utils/register-properties";
import directives from "@/utils/directives";
import { useMainStore } from "@/store";

const app = createApp(App);
app.use(pinia);

app.use(router);

app.use(registerProperties);
app.use(directives);

app.mount("#app");
