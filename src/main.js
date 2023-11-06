import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "./axios/axios.js";

const app = createApp(App);
app.use(router);
app.use(Antd);

app.component('font-awesome-icon', FontAwesomeIcon).mount("#app");
