<template>
  <div class="flex justify-center items-center w-full">
    <div class="flex w-1/2 border rounded py-10 px-5">
      <div class="basis-1/2">
        <h2 class="text-lg font-bold text-cyan-600">
          Update API Key - Secret Key
        </h2>
        <br />
      </div>
      <div class="basis-2/3">
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
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button @click="handleSubmitAPI" type="success">
                  Save
                </n-button>
              </div>
            </n-col>
          </n-row>
        </n-form>
      </div>
    </div>
  </div>
  <br />
  <div class="flex justify-center items-center w-full">
    <div class="flex w-1/2 border rounded py-10 px-5">
      <div class="basis-1/2">
        <h2 class="text-lg font-bold text-cyan-600">Change password</h2>
        <br />
      </div>
      <div class="basis-2/3">
        <n-form
          ref="formRef"
          :label-width="80"
          :model="formValue"
          :rules="rules"
          :size="size"
        >
          <n-form-item label="Current password" path="currentPassword">
            <n-input
              v-model:value="formValue.currentPassword"
              type="password"
              placeholder="Input current password"
            />
          </n-form-item>
          <n-form-item label="New password" path="newPassword">
            <n-input
              v-model:value="formValue.newPassword"
              type="password"
              placeholder="Input new password"
            />
          </n-form-item>
          <n-form-item label="Confirm new password" path="confirmPassword">
            <n-input
              v-model:value="formValue.confirmPassword"
              type="password"
              placeholder="Input confirm new password"
            />
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button @click="handleChangePassword" type="success">
                  Save
                </n-button>
              </div>
            </n-col>
          </n-row>
        </n-form>
      </div>
    </div>
  </div>
  <br />

  <div class="flex justify-center items-center w-full">
    <div class="flex w-1/2 border rounded py-10 px-5">
      <div class="basis-1/2">
        <h2 class="text-lg font-bold text-cyan-600">Delete account</h2>
        <br />
      </div>
      <div class="basis-2/3">
        <n-button type="error" secondary @click="openModalDelete()">
          <template #icon>
            <n-icon>
              <person-remove-icon />
            </n-icon>
          </template>
          <span class="text-base font-bold">CONFIRM DELETE</span>
        </n-button>
      </div>
    </div>
  </div>
  <template>
    <n-modal
      v-model:show="showModalDelete"
      preset="dialog"
      title="Delete account"
      content="Are you sure you want to remove this account?"
      positive-text="Submit"
      negative-text="Cancel"
      type="error"
      @positive-click="handleDeteleUser()"
    />
  </template>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import router from "@router/index";
import { PersonRemove as PersonRemoveIcon } from "@vicons/ionicons5";

import { createDiscreteApi } from "naive-ui";
const { notification } = createDiscreteApi(["notification"], {
  configProviderProps: {
    placement: "top-right",
  },
});

export default defineComponent({
  components: {
    PersonRemoveIcon,
  },
  methods: {
    openModalDelete() {
      this.showModalDelete = true;
    },
  },
  setup() {
    const formRef = ref(null);
    const formValue = ref({
      apiKey: "",
      secretKey: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    const handleShowMessage = (type, title, content) => {
      notification[type]({
        title: title,
        meta: content,
        duration: 3000,
      });
    };

    const handleSubmitAPI = async () => {
      try {
        const values = formValue.value;
        if (values) {
          await axios
            .post("user/update-binance", values)
            .then((res) => {
              handleShowMessage("success", "Updated successfully");
              router.push("/");
            })
            .catch((err) => {
              handleShowMessage("error", "FAILED", err.response.data?.message);
            });
        }
      } catch (error) {
        console.log("Validate Failed:", error);
      }
    };

    const handleChangePassword = async () => {
      try {
        const { currentPassword, newPassword, confirmPassword } =
          formValue.value;
        await axios
          .post("user/update", {
            currentPassword,
            newPassword,
            confirmPassword,
          })
          .then((res) => {
            handleShowMessage("success", "Updated password successfully");
          })
          .catch((err) => {
            handleShowMessage("error", "FAILED", err.response.data?.message);
          });
      } catch (error) {
        console.log("Validate Failed:", error);
      }
    };
    const showModalDelete = ref(false);

    const handleDeteleUser = async () => {     
      try {
        await axios
          .delete("user/")
          .then((res) => {
            showModalDelete.value = false;
            handleShowMessage("success", "Deleted successfully");
            localStorage.removeItem("token");
            localStorage.removeItem("username");

            router.push("/login");
          })
          .catch((err) => {
            handleShowMessage("error", "FAILED", err);
          });
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
        currentPassword: {
          required: true,
          message: "Please input your current password",
          trigger: ["input", "blur"],
        },
        newPassword: {
          required: true,
          message: "Please input your new password",
          trigger: ["input", "blur"],
        },
        confirmPassword: {
          required: true,
          message: "Please input confirm password",
          trigger: ["input", "blur"],
        },
      },
      handleSubmitAPI,
      handleChangePassword,
      handleDeteleUser,
      showModalDelete,
    };
  },
});
</script>
