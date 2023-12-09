<template>
  <div class="mb-4 border rounded p-2">
    <span class="font-bold text-lg text-cyan-500">WALLET</span> <br />
    <span v-if="wallet.length === 0"
      >Please update
      <a href="/profile" class="text-cyan-500">API Key - Secret Key!</a></span
    >
    <n-tag
      v-for="(coin, index) in wallet"
      class="mr-4 mt-1 border rounded"
      :color="{ color: '#426fe9', textColor: '#fff' }"
    >
      <b> {{ index }} : {{ coin }}</b>
    </n-tag>
  </div>
  <div class="flex items-center justify-between border p-4 rounded">
    <div>
      <n-form
        ref="formRef"
        :model="formState"
        name="form_in_modal"
        label-placement="top"
      >
        <n-grid :span="12" :x-gap="12">
          <n-form-item-gi
            :span="12"
            label="COIN"
            name="coin"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <n-select
              v-model:value="formState.coin"
              :disabled="bot && true"
              :options="options"
            >
            </n-select>
          </n-form-item-gi>
          <!-- <n-form-item-gi
            :span="12"
            label="Min buy"
            name="minUSDT"
            path="inputValue"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <n-input-number v-model:value="formState.minUSDT" />
          </n-form-item-gi> -->

          <n-form-item-gi
            :span="12"
            label="Capital"
            name="maxUSDT"
            :rules="[{ required: true }]"
          >
            <n-input-number v-model:value="formState.maxUSDT" :min="10">
              <template #prefix> USDT </template>
            </n-input-number>
          </n-form-item-gi>

          <n-form-item-gi
            :span="12"
            label="Max price of Coin"
            name="limitPriceBuy"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <n-input-number v-model:value="formState.limitPriceBuy" :min="0">
              <template #prefix> USDT </template>
            </n-input-number>
          </n-form-item-gi>

          <n-form-item-gi
            :span="12"
            label="Profit"
            name="profit"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <n-input-number v-model:value="formState.profit" :min="0">
              <template #prefix> USDT </template>
            </n-input-number>
          </n-form-item-gi>

          <n-form-item-gi
            :span="12"
            label="Stop loss"
            name="stoploss"
            :rules="[
              {
                required: true,
              },
            ]"
          >
            <n-input-number v-model:value="formState.stoploss" :min="0">
              <template #prefix> USDT </template>
            </n-input-number>
          </n-form-item-gi>

          <n-form-item-gi
            :span="12"
            label="DCA"
            name="limitDCA"
            :rules="[{ required: true }]"
          >
            <n-input-number v-model:value="formState.limitDCA" :min="0">
              <template #prefix> USDT </template>
            </n-input-number>
          </n-form-item-gi>

          <n-form-item-gi
            :span="24"
            label="Option"
            name="mode"
            :rules="[{ required: true }]"
          >
            <n-radio-group v-model:value="formState.option">
              <n-radio value="HOLD">HOLD</n-radio>
              <n-radio value="STOP_LOSS">STOP LOSS</n-radio>
              <n-radio value="DCA">DCA</n-radio>
            </n-radio-group>
          </n-form-item-gi>
          <n-gi :span="24">
            <div style="display: flex; justify-content: flex-end">
              <n-button type="primary" strong @click="onOk">
                {{ bot ? "Save" : "Start" }}
              </n-button>
            </div>
          </n-gi>
        </n-grid>
      </n-form>
    </div>

    <!-- MODE -->
    <!-- <div>
      <span class="text-lg font-semibold"
        >Mode: <span class="text-red-500">HOLD</span></span
      >
    </div> -->
    <!-- Button start/stop -->
    <!-- <div>
      <n-button type="primary"
        ><font-awesome-icon icon="fn-solid fn-play"
      /></n-button>
    </div> -->
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { CashOutline as CashIcon } from "@vicons/ionicons5";
import axios from "axios";
import pusher from "../plugins/pusher";

import { createDiscreteApi } from "naive-ui";
const { notification } = createDiscreteApi(["notification"], {
  configProviderProps: {
    placement: "top-right",
  },
});

export default {
  coreplugins: {
    preflight: false,
  },
  components: {
    CashIcon,
  },
  props: {
    bot: Object,
  },
  setup(props) {
    const formRef = ref();
    const visible = ref(false);

    const bot = props.bot;
    const formState = reactive({
      botId: bot?._id,
      coin: bot?.coin,
      maxUSDT: bot?.maxUSDT,
      limitPriceBuy: bot?.limitPriceBuy,
      profit: bot?.profit,
      stoploss: bot?.stoploss,
      limitDCA: bot?.limitDCA,
      option: bot?.option,
    });

    const onOk = async () => {
      try {
        const values = formState;
        if (values) {
          await axios
            .post("bot-save", formState)
            .then((res) => {
              console.log(res);
              handleShowMessage(
                "success",
                "Successfully",
                "Saved bot configuration successfully!"
              );
              visible.value = false;
              formState.value?.resetFields();
            })
            .catch((err) => {
              handleShowMessage("error", "FAILED", err.response.data.message);
            });
        }
      } catch (error) {
        console.log("Validate Failed:", error);
      }
    };

    // Using onMounted to access the formRef after the component is mounted
    onMounted(() => {
      const channel = pusher.subscribe(localStorage.getItem("username"));

      channel.bind("wallet", (data) => {
        wallet.value = data.wallet;
      });
    });

    // onUnmounted(() => {
    //   pusher.unsubscribe("my-channel");
    // });

    const showModal = () => {
      visible.value = true;
    };

    const wallet = ref([]);
    const options = ref([]);

    const response = async () => {
      const res = await axios.get("user/wallet");

      if (res) {
        wallet.value = res.data.wallet;
        options.value = Object.entries(wallet.value)
          .filter(([key, value]) => key !== "USDT") // Filter out 'USDT'
          .map(([key, value], index) => ({
            label: key,
            value: key,
          }));
      }
    };

    response();

    const handleShowMessage = (type, title, content) => {
      notification[type]({
        title: title,
        meta: content,
        duration: 3000,
      });
    };

    return {
      formRef,
      visible,
      formState,
      onOk,
      showModal,
      wallet,
      options,
    };
  },
};
</script>

<style scoped>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
