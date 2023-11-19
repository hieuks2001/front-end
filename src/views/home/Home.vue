<template>
  <div class="flex flex-row">
    <div class="basis-1/4 p-4">
      <BotConfigForm  />
    </div>
    <div class="basis-1/2">
      <Chart
        :options="{
          theme: 'dark',
          symbol: 'BTCUSDT',
          timezone: 'Asia/Ho_Chi_Minh',
          locale: 'en',
          interval: '1',
          height: '500px',
        }"
      />
      <BotStatus />
    </div>
    <div class="basis-1/4">03</div>
  </div>

  <!-- <Snaps/>
  <Screener/> -->
</template>

<script>
import BotConfigForm from "../../components/BotConfigForm.vue";
import BotStatus from "../../components/BotStatus.vue";
import { Chart, Snaps, Screener } from "vue-tradingview-widgets";


export default {
  name: "Home",
  components: {
    Chart,
    Snaps,
    Screener,
    BotConfigForm,
    BotStatus,
  },
  props: ['user'],
};
</script>
