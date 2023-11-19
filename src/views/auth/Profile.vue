<template>
  <div class="flex justify-center items-center w-full ">
    <div class="w-1/3 border rounded py-10 px-5">
        <h2 class="text-lg font-bold text-cyan-600">Update API Key - Secret Key</h2> <br>
      <n-form
        ref="formRef"
        :label-width="80"
        :model="formValue"
        :rules="rules"
        :size="size"
      >
        <n-form-item label="API Key" path="apiKey">
          <n-input
            v-model:value="formValue.apiKey"
            placeholder="Input API Key"
          />
        </n-form-item>
        <n-form-item label="Secret Key" path="secretKey">
          <n-input
            v-model:value="formValue.secretKey"
            placeholder="Input Secret Key"
          />
        </n-form-item>
        <n-form-item>
          <n-button @click="handleSubmit" type="success"> Save </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>


</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";

import { createDiscreteApi } from "naive-ui";
const { notification } = createDiscreteApi(["notification"], {
  configProviderProps: {
    placement: "top-right",
  },
});

export default defineComponent({
  setup() {
    const formRef = ref(null);
    const formValue = ref({
      apiKey: "",
      secretKey: "",
      //   oldPassword:"",
      //   newPassword:"",
      //   rePassword:""
    });

    const handleShowMessage = (type, title, content) => {
      notification[type]({
        title: title,
        meta: content,
        duration: 3000,
      });
    };

    const handleSubmit = async () => {
      try {
        const values = formValue.value;
        if (values) {
          await axios
            .post("user/update-binance", values)
            .then((res) => {
              handleShowMessage("success", "Updated successfully");
            })
            .catch((err) => {
              handleShowMessage("error", "FAILED", err.response.data?.message);
            });
        }
      } catch (error) {
        console.log("Validate Failed:", error);
      }
    };

    return {
      formRef,
      size: ref("large"),
      formValue,
      rules: {
        apiKey: {
          required: true,
          message: "Please input your API Key",
          trigger: "blur",
        },
        secretKey: {
          required: true,
          message: "Please input your Secret Key",
          trigger: ["input", "blur"],
        },
      },
      handleSubmit,
    };
  },
});
</script>
