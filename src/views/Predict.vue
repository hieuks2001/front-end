<template>
  <div class="container mx-auto">
    <span class="text-2xl font-bold">Predict price of coin in next 24h </span>
    <div class="w-[20rem] flex flex-row gap-2 mb-10 mt-3">
      <n-select v-model:value="coin" :options="options"> </n-select>
      <n-button @click="handlePredict" type="primary"> Submit </n-button>
    </div>
    <n-spin :show="show">
      <div class="flex flex-row gap-4 items-center">
        <img class="carousel-img" :src="src" />
        <div v-if="src"
          class="container mx-auto my-8 p-4 bg-gray-100 shadow-md rounded-md"
        >
          <div class="text-xl font-bold mb-4">Explain chart:</div>
         <div>
          <span class="mb-2 text-lg">
            <span class="font-semibold">X-axis:</span>
            24 hours
          </span>
          /
          <span class="mb-2 text-lg">
            <span class="font-semibold">Y-axis:</span>
            Price of Coin
          </span>
         </div>
          <p class="mb-2 text-lg">
            <span class="font-semibold">Max error:</span>
            is the largest error between the predicted value and the actual
            value in the entire data set.
          </p>
          <p class="mb-2 text-lg">
            <span class="font-semibold">RMSE:</span>
            is a measure of the average magnitude of the error between the
            predicted value and the actual value. For RMSE, the higher the
            value, the greater the deviation between prediction and reality.
          </p>

          <div class="text-xl font-bold mb-4">Data Object:</div>
          <p class="mb-2 text-lg">
            <span class="font-semibold">Username:</span>
            {{ dataObject["username"] }}
          </p>
          <p class="mb-2 text-lg">
            <span class="font-semibold">Price predict previous:</span>
            {{ dataObject["price_predict_previous"] }} USDT
          </p>
          <p class="mb-2 text-lg">
            <span class="font-semibold">Price predict last:</span>
            {{ dataObject["price_predict_last"] }} USDT
          </p>
          <p class="mb-2 text-lg">
            <span class="font-semibold">Price actual previous:</span>
            {{ dataObject["price_actual_previous"] }} USDT
          </p>
          <p class="mb-2 text-lg">
            <span class="font-semibold">Price actual last:</span>
            {{ dataObject["price_actual_last"] }} USDT
          </p>
        </div>
      </div>
      <template #description>
        <span class="text-xl"
          >Please waiting a minutes to get result of predict!</span
        >
      </template>
    </n-spin>
  </div>
</template>

<script>
import { h, defineComponent, ref, reactive } from "vue";
import axios from "axios";
import { createDiscreteApi } from "naive-ui";
const { loadingBar } = createDiscreteApi(["loadingBar"], {
  configProviderProps: {
    placement: "top-right",
  },
});

export default defineComponent({
  setup() {
    const formState = reactive({
      coin: null,
    });
    const options = ref([]);

    const response = async () => {
      const res = await axios.get("user/wallet");
      if (res) {
        options.value = Object.entries(res.data.wallet)
          .filter(([key, value]) => key !== "USDT") // Filter out 'USDT'
          .map(([key, value], index) => ({
            label: key,
            value: key + "USDT",
          }));
      }
    };

    response();

    const coin = ref(null);
    const src = ref(null);
    let dataArray = [];
    const show = ref(false);
    const dataObject = ref({});
    const handlePredict = async () => {
      try {
        show.value = !show.value;

        if (coin) {
          // axios.defaults.baseURL = 'http://localhost:8000/'+coin.value;
          loadingBar.start();
          await axios
            .get("http://127.0.0.1:8000/" + coin.value, {
              params: { username: localStorage.getItem("username") },
            })
            .then((res) => {
              src.value =
                "http://127.0.0.1:8000/" +
                coin.value +
                "/image?username=" +
                localStorage.getItem("username");

              dataArray = res.data[0];
              dataObject.value = {
                username: dataArray[2],
                price_predict_last: dataArray[6],
                price_predict_previous: dataArray[7],
                price_actual_last: dataArray[8],
                price_actual_previous: dataArray[9],
              };
              show.value = !show.value;
              loadingBar.finish();
            })
            .catch((err) => {
              console.log(err);
              // handleShowMessage("error", "FAILED", err.response.data.message);
            });
        }
      } catch (error) {
        show.value = !show.value;
        console.log("Validate Failed:", error);
      }
    };

    console.log(dataObject.value);
    return {
      coin,
      options,
      handlePredict,
      src,
      show,
      dataObject,
    };
  },
});
</script>
