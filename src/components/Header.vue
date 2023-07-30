<template>
  <div class="relative mb-20">
    <header class="text-gray-600 body-font fixed top-0 left-0 right-0 bg-white">
      <div
        class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
      >
        <a
          class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src="images/logo.png" alt="" srcset="" class="logo" />

          <span class="ml-3 text-xl">S-Viet Travel</span>
        </a>
        <nav
          class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"
        >
          <router-link to="/"
            ><a
              class="mr-10 text-xl text-black font-semibold hover:text-blue-500"
              >Trang chủ</a
            ></router-link
          >
          <router-link to="about"
            ><a
              class="mr-10 text-xl text-black font-semibold hover:text-blue-500"
              >Về chúng tôi</a
            ></router-link
          >
          <router-link to="price-list"
            ><a
              class="mr-10 text-xl text-black font-semibold hover:text-blue-500"
              >Bảng giá</a
            ></router-link
          >
          <router-link to="contact"
            ><a
              class="mr-10 text-xl text-black font-semibold hover:text-blue-500"
              >Liên hệ</a
            ></router-link
          >
        </nav>
        <router-link to="/login">
          <button
            class="inline-flex items-center bg-green-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-lg font-semibold mt-4 md:mt-0"
          >
            Đăng nhập
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </router-link>
      </div>
    </header>
  </div>
</template>
