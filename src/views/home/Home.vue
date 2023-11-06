<template>
  <div class="flex flex-row">
    <div class="basis-1/4 p-4">
      <div>
        <a-card title="Wallet" size="small" class="gap-y-4">
          <a-tag>USDT: 10000</a-tag>
          <a-tag>USDT: 10000</a-tag>
          <a-tag>USDT: 10000</a-tag>
          <a-tag>USDT: 10000</a-tag>
          <a-tag>USDT: 10000</a-tag>
        </a-card>
      </div>
      <br />
      <BotConfigForm bots="BTC" />
    </div>
    <div class="basis-1/2">
      <Chart
        :options="{
          theme: 'dark',
          symbol: 'BTCUSDT',
          timezone: 'Asia/Ho_Chi_Minh',
          locale: 'en',
          interval: '1',
        }"
      />
    </div>
    <div class="basis-1/4">03</div>
  </div>

  <!-- <Snaps/>
  <Screener/> -->
</template>

<script>
import BotConfigForm from "../../components/BotConfigForm.vue";
import { Chart, Snaps, Screener } from "vue-tradingview-widgets";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Chart,
    Snaps,
    Screener,
    BotConfigForm,
  },
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        this.items = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
