<template>
  <div >
    <Header></Header>

    <router-view></router-view>

    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
// import Header from "@components/Header.vue";
import Header from "@components/Header.vue";
// import Footer from "../../../components/Footer.vue";
import Home from "@views/home/Home.vue";
export default {
  components: {
    Header,
    // Footer,
    Home,
  },
};
</script>
