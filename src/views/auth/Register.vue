<template>
  <body class="min-h-screen">
    <div
      class="min-h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4"
    >
      <div class="flex flex-col items-center justify-center">
        <div class="text-center">
          <img src="images/logo2.png" alt="" srcset="" class="logo" />
        </div>
        <h1 class="text-6xl font-bold text-white">S-Viet Travel</h1>

        <form
          class="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10"
          @submit.prevent="save()"
        >
          <div>
            <span class="text-sm font-medium leading-none text-gray-800">
              Username
            </span>
            <input
              role="input"
              class="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              v-model="register.username"
              v-bind:class="{ 'border-2 border-rose-500': errors.username }"
            />
            <div class="text-red-500">{{ errors.username }}</div>
          </div>
          <div class="mt-6">
            <span class="text-sm font-medium leading-none text-gray-800">
              Email
            </span>
            <input
              role="input"
              type="email"
              v-model="register.email"
              class="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              v-bind:class="{ 'border-2 border-rose-500': errors.email }"
            />
            <div class="text-red-500">{{ errors.email }}</div>
          </div>
          <div class="mt-6">
            <span class="text-sm font-medium leading-none text-gray-800">
              Phone number
            </span>
            <input
              role="input"
              v-model="register.phone_number"
              class="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              v-bind:class="{ 'border-2 border-rose-500': errors.phone_number }"
            />
            <div class="text-red-500">{{ errors.phone_number }}</div>
          </div>
          <div class="mt-6 w-full">
            <span class="text-sm font-medium leading-none text-gray-800">
              Password
            </span>
            <div class="relative flex items-center justify-center">
              <input
                role="input"
                :type="show_pwd ? 'text' : 'password'"
                v-model="register.pwd"
                class="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                v-bind:class="{ 'border-2 border-rose-500': errors.pwd }"
              />
              <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  v-bind:class="{ hidden: show_pwd }"
                  @click="show_pwd = !show_pwd"
                >
                  <path
                    d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512"
                  v-bind:class="{ hidden: !show_pwd }"
                  @click="show_pwd = !show_pwd"
                >
                  <path
                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"
                  />
                </svg>
              </div>
            </div>
            <div class="text-red-500">{{ errors.pwd }}</div>
          </div>
          <div class="mt-6 w-full">
            <span class="text-sm font-medium leading-none text-gray-800">
              Confirm password
            </span>
            <div class="relative flex items-center justify-center">
              <input
                role="input"
                :type="show_confirmPwd ? 'text' : 'password'"
                v-model="register.confirm_pwd"
                class="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                v-bind:class="{
                  'border-2 border-rose-500': errors.confirm_pwd,
                }"
              />
              <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  v-bind:class="{ hidden: show_confirmPwd }"
                  @click="show_confirmPwd = !show_confirmPwd"
                >
                  <path
                    d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                  />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512"
                  v-bind:class="{ hidden: !show_confirmPwd }"
                  @click="show_confirmPwd = !show_confirmPwd"
                >
                  <path
                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z"
                  />
                </svg>
              </div>
            </div>
            <div class="text-red-500">{{ errors.confirm_pwd }}</div>
          </div>
          <p class="text-sm mt-4 font-medium leading-none text-gray-500">
            Already have account?
            <router-link to="/login">
              <span
                tabindex="0"
                role="link"
                class="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
              >
                Sign in here
              </span>
            </router-link>
          </p>
          <div class="mt-8">
            <button
              class="focus:ring-2 focus:ring-offset-2 focus:ring-green-700 text-sm font-semibold leading-none text-white focus:outline-none bg-green-600 border rounded hover:bg-indigo-300 py-4 w-full"
            >
              Sign-up
            </button>
          </div>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      errors: {
        username: "",
        email: "",
        phone_number: "",
        pwd: "",
        confirm_pwd: "",
      },
      register: {
        username: "",
        email: "",
        phone_number: "",
        pwd: "",
        confirm_pwd: "",
      },
      show_pwd:false,
      show_confirmPwd:false
    };
  },
  methods: {
    validate() {
      this.errors = {
        username: "",
        email: "",
        phone_number: "",
        pwd: "",
        confirm_pwd: "",
      };

      if (!this.register.username) {
        this.errors.username = "Username is required!";
      }
      if (!this.register.email) {
        this.errors.email = "Email is required!";
      }
      if (!this.register.phone_number) {
        this.errors.phone_number = "Phone number is required!";
      } else if (!this.isNumber(this.register.phone_number)) {
        this.errors.phone_number = "Phone number must be number!";
      }
      if (!this.register.pwd) {
        this.errors.pwd = "Password is required!";
      } else if (this.register.pwd.length < 8) {
        this.errors.pwd = "Password must be 8 characters or more!";
      }
      if (!this.register.confirm_pwd) {
        this.errors.confirm_pwd = "Confirm password is required!";
      } else if (this.register.confirm_pwd.length < 8) {
        this.errors.confirm_pwd = "Password must be 8 characters or more!";
      }
      if (this.register.confirm_pwd !== this.register.pwd) {
        this.errors.pwd = "Password does not match!";
        this.errors.confirm_pwd = "Password does not match!";
      }
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    save() {
      this.validate();
      console.log(this.register);
    },
  },
};
</script>
