<template>
  <div class="container mx-auto mb-[50px]">
    <div class="flex">
      <Snaps
        :options="{
          feedMode: 'all_symbols',
          colorTheme: 'light',
          displayMode: 'regular',
          with: '400',
          height: '800',
          locale: 'en',
        }"
      />
      <div class="flex-1 w-64">
        <CryptoMarket
          :options="{
            colorTheme: 'light',
            width: '100%',
            height: '800',
            locale: 'en',
            defaultColumn: 'overview',
            displayCurrency: 'USD',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Snaps, CryptoMarket } from "vue-tradingview-widgets";

export default {
  name: "News",
  components: {
    Snaps,
    CryptoMarket,
  },
};
</script>
