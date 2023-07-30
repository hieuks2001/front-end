<template>
  <div class="w-full flex items-center justify-center my-12">
    <form
      class="mt-10 top-40 shadow rounded py-12 lg:px-28 px-8"
      @submit.prevent="save()"
    >
      <p
        class="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700"
      >
        Trò chuyện và nhận báo giá ngay!
      </p>
      <div class="md:flex items-center mt-12">
        <div class="md:w-72 flex flex-col">
          <label class="text-base font-semibold leading-none text-gray-800"
            >Tên</label
          >
          <input
            tabindex="0"
            type="name"
            class="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
            v-model="contact.name"
            v-bind:class="{ 'border-2 border-rose-500': errors.name }"
          />
          <div class="text-red-500">{{ errors.name }}</div>
        </div>
        <div class="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
          <label class="text-base font-semibold leading-none text-gray-800"
            >Email</label
          >
          <input
            tabindex="0"
            arial-label="Please input email address"
            type="name"
            class="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
            placeholder="Please input email address"
            v-model="contact.email"
            v-bind:class="{ 'border-2 border-rose-500': errors.email }"
          />
          <div class="text-red-500">{{ errors.email }}</div>
        </div>
      </div>
      <div class="md:flex items-center mt-8">
        <div class="md:w-72 flex flex-col">
          <label class="text-base font-semibold leading-none text-gray-800"
            >SĐT</label
          >
          <input
            tabindex="0"
            role="input"
            arial-label="Please input your phone number"
            type="name"
            class="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
            placeholder="Please input your phone number"
            v-model="contact.phone_number"
            v-bind:class="{ 'border-2 border-rose-500': errors.phone_number }"
          />
          <div class="text-red-500">{{ errors.phone_number }}</div>
        </div>
        <div class="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
          <label class="text-base font-semibold leading-none text-gray-800"
            >Quốc gia</label
          >
          <input
            tabindex="0"
            arial-label="Please input country name"
            type="name"
            class="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
            placeholder="Please input country name"
            v-model="contact.country"
          />
        </div>
      </div>
      <div>
        <div class="w-full flex flex-col mt-8">
          <label class="text-base font-semibold leading-none text-gray-800"
            >Tin nhắn</label
          >
          <textarea
            tabindex="0"
            aria-label="leave a message"
            role="textbox"
            type="name"
            class="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
            v-model="contact.message"
            v-bind:class="{ 'border-2 border-rose-500': errors.message }"
          ></textarea>

          <div class="text-red-500">{{ errors.message }}</div>
        </div>
      </div>
      <div class="text-green-500">{{ success.message }}</div>

      <div class="flex items-center justify-center w-full">
        <button
          class="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none"
        >
          Đồng ý
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ContactForm",
  data() {
    return {
      success:{
        message:""
      },
      errors: {
        name: "",
        email: "",
        phone_number: "",
        country: "",
        message: "",
      },
      contact: {
        name: "",
        email: "",
        phone_number: "",
        country: "",
        message: "",
      },
    };
  },
  methods: {
    validate() {
      this.success={
        message:""
      },
      this.errors = {
        name: "",
        email: "",
        phone_number: "",
        country: "",
        message: "",
      };
      if (!this.contact.name) {
        this.errors.name = "Customer name is required";
        return false;
      }
      if (!this.contact.email) {
        this.errors.email = "Customer email is required";
        return false;
      }
      if (!this.contact.phone_number) {
        this.errors.phone_number = "Customer phone number is required";
        return false;
      } else if (!this.isNumber(this.contact.phone_number)) {
        this.errors.phone_number = "Customer phone number must be number";
        return false;
      }
      if (!this.contact.message) {
        this.errors.message = "Customer message is required";
        return false;
      }
      return true;
    },
    isNumber(value) {
      return /^\d*$/.test(value);
    },
    save() {
     if (this.validate()){
       axios.post("http://127.0.0.1:8000/api/contacts",this.contact)
        .then(response => this.success.message ="Gửi thành công!");     
      }
     }   
  },
};
</script>
