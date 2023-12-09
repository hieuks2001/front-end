<template>
  <div class="flex flex-row">
    <div class="basis-1/4 p-4">
      <BotConfigForm />
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
      <TickerTape />
      <BotStatus />
    </div>
    <div class="basis-1/4 mx-2">
      <div>
        <span class="text-lg font-bold"
          >Net total:
          <span class="text-red-400"
            >{{ summary?.toLocaleString() }} USDT
          </span></span
        >
      </div>
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="pagination"
        :bordered="false"
      />
      <n-modal v-model:show="showModal">
        <n-card
          style="width: 600px"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
        <p class="text-lg font-bold mb-6">COIN: <span class="text-cyan-600">{{ this.selectedHistory.coin }}</span></p>
          <p class="flex text-base gap-5">
            <div class="basis 1/2 text-lg">
              <p>Purchase price: <b>{{ this.selectedHistory.buy.toLocaleString() }} USDT</b></p>
              <p>Purchase fee: <b>{{ this.selectedHistory.feebuy }}</b></p>
              <p>Purchase date: <b>{{ this.selectedHistory.datebuy }}</b></p>
              <p>Amount: <b>{{ this.selectedHistory.size.toLocaleString() }} {{ this.selectedHistory.coin }}</b></p>

            </div>
            <div class="basis 1/2 text-lg">                   
              <p>Sale price: <b>{{ this.selectedHistory.sell.toLocaleString() }} USDT</b></p>
              <p>Sale fee: <b>{{ this.selectedHistory.feesell.toLocaleString() }}</b></p>
              <p>Sale date: <b>{{ this.selectedHistory.datesell }}</b></p>
              <p>Option: <b>{{ this.selectedHistory.option }}</b></p>
            </div>     
          </p>
          <p class="text-lg font-bold mt-6">PROFIT: <span class="text-red-400">{{ this.selectedHistory.profit.toLocaleString() }} USDT </span></p>
        </n-card>
      </n-modal>
    </div>
  </div>

  <!-- <Snaps/>
  <Screener/> -->
</template>

<script>
import BotConfigForm from "../../components/BotConfigForm.vue";
import BotStatus from "../../components/BotStatus.vue";
import { Chart, Snaps, Screener, TickerTape } from "vue-tradingview-widgets";
import { h, defineComponent, ref, onMounted } from "vue";
import { NButton, NTag, NIcon } from "naive-ui";
import axios from "axios";
import pusher from "../../plugins/pusher";
import { DocumentOutline } from "@vicons/ionicons5";

export default defineComponent({
  name: "Home",
  components: {
    Chart,
    Snaps,
    Screener,
    BotConfigForm,
    BotStatus,
    DocumentOutline,
    TickerTape,
  },
  props: ["user"],
  setup() {
    const renderDocumentIcon = () => {
      return h(NIcon, null, { default: () => h(DocumentOutline) });
    };

    const createColumns = ({ openModal }) => {
      return [
        {
          title: "Coin",
          key: "coin",
          render(row) {
            return h(
              NTag,
              {
                class: "mr-4 mt-1 border rounded",
                style: {
                  color: "#fff",
                  backgroundColor: "#426fe9",
                  fontWeight: 600,
                },
              },
              { default: () => row.coin }
            );
          },
        },
        {
          title: "Profit (USDT)",
          key: "profit",
          render(row) {
            return h(
              "b",
              {
                class: "",
              },
              { default: () => row.profit.toLocaleString() }
            );
          },
        },
        {
          title: "Detail",
          key: "detail",
          render(row) {
            return h(
              NButton,
              {
                type: "success",
                secondary: true,
                size: "small",
                onClick: () => openModal(row),
              },
              { default: () => renderDocumentIcon() }
            );
          },
        },
      ];
    };

    const data = ref([]);
    const summary = ref(0);

    const response = async () => {
      const res = await axios.get("user/wallet");
      if (res) {
        const histories = res.data.histories;
        data.value = histories;
        histories.forEach((history) => {
          summary.value += history.profit;
        });
      }
    };
    response();

    onMounted(() => {
      const channel = pusher.subscribe(localStorage.getItem("username"));

      channel.bind("history", (res) => {
        if (res) {
          data.value.unshift(res);
          summary.value += res.profit;
        }
      });
    });

    const showModal = ref(false);
    const selectedHistory = ref({});

    const openModal = (history) => {
      showModal.value = true;
      selectedHistory.value = history;
    };

    return {
      data,
      columns: createColumns({ openModal }),
      pagination: true,
      summary,
      showModal,
      selectedHistory,
    };
  },
});
</script>
