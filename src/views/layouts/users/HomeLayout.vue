<template>
  <div>
    <Header :user="user"></Header>

    <router-view ></router-view>

    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// import Header from "@components/Header.vue";
import Header from "@components/Header.vue";
// import Footer from "../../../components/Footer.vue";
import Home from "@views/home/Home.vue";
import { ref } from "vue";
import axios from "axios";

export default {
  components: {
    Header,
    // Footer,
    Home,
  },
  setup() {
    const user = ref({});
    const trading = ref("");

    const response = async () => {
      const res = await axios.get("me").catch((err) => {
        localStorage.removeItem("token");
      });

      if (res) {
        user.value = res.data.data;
      }

    };
    
    response();

    return {
      user,
    };
  },
};
</script>
