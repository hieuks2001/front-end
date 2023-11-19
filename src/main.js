import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./axios/axios.js";
import naive from "naive-ui";

const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

const app = createApp(App);
app.use(router);
app.use(naive);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
