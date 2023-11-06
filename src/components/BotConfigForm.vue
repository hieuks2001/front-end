<template>
  <div class="flex items-center justify-between bg-slate-400 p-4 rounded">
    <div>
      <span class="font-semibold text-lg mr-3">{{bots }}</span>
      <!-- MODAL -->
      <a-button type="primary" size="small" @click="showModal">
        <font-awesome-icon icon="fa-doutone fa-gears"
      /></a-button>
      <a-modal
        v-model:visible="visible"
        title="Config BOT"
        ok-text="Save"
        cancel-text="Cancel"
        @ok="onOk"
      >
        <a-form
          ref="formRef"
          :model="formState"
          name="form_in_modal"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-form-item
            label="COIN"
            name="coin"
            :rules="[
              {
                required: true,
                message: 'Please select coin to run bot',
              },
            ]"
          >
            <a-select
              v-model:value="formState.coin"
              placeholder="Please select coin to run bot"
            >
              <a-select-option value="BTC">BTC</a-select-option>
              <a-select-option value="ETH">ETH</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="Min buy"
            name="Min buy"
            :rules="[
              {
                required: true,
                message: 'Please input min buy (over 10USDT)!',
              },
            ]"
          >
            <a-input v-model:value="formState.min" />
          </a-form-item>
          <a-form-item
            label="Max buy"
            name="Max buy"
            :rules="[{ required: true, message: 'Please input max buy!' }]"
          >
            <a-input v-model:value="formState.max" />
          </a-form-item>
          <a-form-item
            label="Max trade price"
            name="Max trade price"
            :rules="[
              {
                required: true,
                message: 'Please input max trade price can buy!',
              },
            ]"
          >
            <a-input v-model:value="formState.maxbuy" />
          </a-form-item>
          <a-form-item
            label="Profit"
            name="Profit"
            :rules="[
              {
                required: true,
                message: 'Please input profit you wanna get!',
              },
            ]"
          >
            <a-input v-model:value="formState.minprofit" />
          </a-form-item>
          <a-form-item
            label="Stop loss"
            name="Stop loss"
            :rules="[
              {
                required: true,
                message: 'Please input trade price you want stop bot!',
              },
            ]"
          >
            <a-input v-model:value="formState.stoploss" />
          </a-form-item>
          <a-form-item
            label="DCA"
            name="DCA"
            :rules="[{ required: true, message: 'Please input DCA!' }]"
          >
            <a-input v-model:value="formState.dca" />
          </a-form-item>
          <a-form-item label="Mode" name="mode"  :rules="[{ required: true, message: 'Please input DCA!' }]">
            <a-radio-group v-model:value="formState.resource">
              <a-radio value="HOLD">HOLD</a-radio>
              <a-radio value="STOP_LOSS">STOP_LOSS</a-radio>
              <a-radio value="DCA">DCA</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>

    <!-- MODE -->
    <div>
      <span class="text-lg font-semibold"
        >Mode: <span class="text-red-500">HOLD</span></span
      >
    </div>
    <!-- Button start/stop -->
    <div>
      <a-button type="primary"
        ><font-awesome-icon icon="fa-solid fa-play"
      /></a-button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRaw } from "vue";
import { onMounted } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGears, faPlay } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faGears, faPlay);
export default {
  props: {
    bots: String, // Define the type if necessary
  },
  setup() {
    const formRef = ref();
    const visible = ref(false);
    const formState = reactive({
      title: "",
      description: "",
      modifier: "public",
    });

    const onOk = async () => {
      try {
        const values = await formRef.value?.validateFields();
        if (values) {
          console.log("Received values of form:", values);
          console.log("formState:", toRaw(formState));
          visible.value = false;
          formRef.value?.resetFields();
          console.log("reset formState:", toRaw(formState));
        }
      } catch (error) {
        console.log("Validate Failed:", error);
      }
    };

    // Using onMounted to access the formRef after the component is mounted
    onMounted(() => {
      console.log("formRef:", formRef.value);
    });

    const showModal = () => {
      visible.value = true;
    };

    return {
      formRef,
      visible,
      formState,
      onOk,
      showModal,
    };
  },
};
</script>

<style scoped>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
