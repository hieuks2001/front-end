<template>
  <div class="relative mb-5">
    <header class="text-gray-600 body-font bg-white/60 ">
      <div
        class="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center"
      >
        <a
          class="flex title-font font-medium items-center text-gray-900 "
        >
          <span class="ml-3 text-xl">BOT TRADE</span>
        </a>
        <nav
          class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center text-center"
        >
          <router-link to="/"
            ><a
              class="mr-10 text-xl text-black font-semibold hover:text-blue-500"
              >Profile</a
            ></router-link
          >
          <router-link to="about"
            ><a
              class="mr-10 text-xl text-black font-semibold hover:text-blue-500"
              >News</a
            ></router-link
          >
          <router-link to="price-list"
            ><a
              class="mr-10 text-xl text-black font-semibold hover:text-blue-500"
              >Predict Price</a
            ></router-link
          >
        </nav>
       
      </div>
    </header>
  </div>
</template>
