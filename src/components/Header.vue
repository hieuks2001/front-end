<template>
  <div class="relative mb-5">
    <header class="text-white body-font bg-gray-700">
      <div
        class="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center"
      >
        <a class="flex title-font font-medium items-center">
          <a class="ml-3 text-xl" href="/">BOT TRADE</a>
        </a>
        <nav
          class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center text-center"
        >
          <router-link to="/"
            ><a class="mr-10 text-xl font-semibold hover:text-blue-500"
              >Home</a
            ></router-link
          >
          <router-link to="/news"
            ><a class="mr-10 text-xl font-semibold hover:text-blue-500"
              >News</a
            ></router-link
          >
          <router-link to="/predict"
            ><a class="mr-10 text-xl font-semibold hover:text-blue-500"
              >Predict Price</a
            ></router-link
          >
        </nav>

        <div class="inline-flex items-center text-base mt-4 md:mt-0">
          <n-dropdown :options="options"
            ><b class="mr-10 text-xl"> {{ user.username }} </b></n-dropdown
          >
        </div>
      </div>
    </header>
  </div>
</template>

<script>

import { h, defineComponent, ref } from "vue";
import { NIcon } from "naive-ui";
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";
import router from "../router/index";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};

export default defineComponent({
  props: {
    user: Object,
  },
  setup() {
    const options = ref([
      {
        label: "Profile",
        key: "profile",
        icon: renderIcon(UserIcon),
        props: {
          onClick: () => {           
            router.push("/profile");
          },
        },
      },     
      {
        label: "Logout",
        key: "logout",
        icon: renderIcon(LogoutIcon),
        props: {
          onClick: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");

            router.push("/login");
          },
        },
      },
    ]);

    return {
      options,
    };
  },
});
</script>
