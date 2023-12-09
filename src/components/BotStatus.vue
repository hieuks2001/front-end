<template>
  <div class="p-4 border rounded">
    <span class="text-lg font-bold">Bot status</span>
    <n-table>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Status</th>
          <th>Config</th>
          <th>Transaction</th>
          <th>Status</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bot in bots || []">
          <td>
            <n-tag
              class="mr-4 mt-1 border rounded"
              :color="{ color: '#426fe9', textColor: '#fff' }"
              ><b>{{ bot.config.coin }}</b></n-tag
            >
          </td>
          <td v-if="!bot.transaction">
            <n-tag type="success">CHECK BUY</n-tag>
          </td>
          <td v-else><n-tag type="error">CHECK SELL</n-tag></td>
          <td>
            <n-button
              @click="openModal(bot.config)"
              strong
              type="warning"
              size="small"
            >
              <template #icon>
                <n-icon>
                  <settings-icon />
                </n-icon>
              </template>
            </n-button>
          </td>
          <td v-if="bot.transaction">
            <p>
              <span
                >Purchase price:
                <b>{{ bot.transaction.buy.toLocaleString() }} USDT</b>
                <br
              /></span>
              <span>
                Spent: <b>{{ bot.config.maxUSDT }} USDT</b> <br />
              </span>
              <span>
                Amount:
                <b
                  >{{ bot.transaction.size.toLocaleString() }}
                  {{ bot.config.coin }}</b
                >
                <br
              /></span>
              <span>
                Time: <b>{{ bot.transaction.datebuy }}</b> <br
              /></span>
            </p>
          </td>
          <td v-else><b>Trading...</b></td>
          <td>
            <n-button
              v-if="botStatus[bot.config._id]"
              strong
              type="success"
              size="small"
              @click="StartBot(bot.config._id)"
            >
              <template #icon>
                <n-icon>
                  <play />
                </n-icon>
              </template>
            </n-button>
            <n-button
              v-else
              secondary
              type="error"
              size="small"
              @click="StopBot(bot.config._id)"
            >
              <template #icon>
                <n-icon>
                  <pause-icon />
                </n-icon>
              </template>
            </n-button>
          </td>
          <td>
            <n-button
              @click="openModalDelete(bot.config)"
              strong
              type="error"
              size="small"
            >
              <template #icon>
                <n-icon>
                  <close-icon />
                </n-icon>
              </template>
            </n-button>
          </td>
        </tr>
      </tbody>
    </n-table>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="BOT CONFIG"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <BotConfigForm :bot="selectedBot" />
      </n-card>
    </n-modal>
    <template>
      <n-modal
        v-model:show="showModalDelete"
        preset="dialog"
        title="Remove BOT"
        content="Are you sure you want to remove this bot?"
        positive-text="Submit"
        negative-text="Cancel"
        type="error"
        @positive-click="submitCallback(selectedBot._id)"
      />
    </template>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import {
  Settings as SettingsIcon,
  CloseCircle as CloseIcon,
  Play,
  Pause as PauseIcon,
} from "@vicons/ionicons5";
import axios from "axios";
import BotConfigForm from "./BotConfigForm.vue";
import pusher from "../plugins/pusher";

import { createDiscreteApi } from "naive-ui";
const { notification } = createDiscreteApi(["notification"], {
  configProviderProps: {
    placement: "top-right",
  },
});

export default defineComponent({
  components: {
    SettingsIcon,
    CloseIcon,
    BotConfigForm,
    Play,
    PauseIcon,
  },
  methods: {
    openModal(bot) {
      this.selectedBot = bot;
      this.showModal = true;
    },
    openModalDelete(bot) {
      this.selectedBot = bot;
      this.showModalDelete = true;
    },
    async StopBot(botId) {
      await axios
        .post("bot-stop", { botId: botId })
        .then((res) => {
          this.botStatus[botId] = !this.botStatus[botId];
          this.handleShowMessage(
            "success",
            "Successfully",
            "Pausing the BOT operation!"
          );
        })
        .catch((err) => {
          this.handleShowMessage("error", "FAILED", err.response);
        });
    },

    async StartBot(botId) {
      await axios
        .post("bot-start", { botId: botId })
        .then((res) => {
          this.botStatus[botId] = !this.botStatus[botId];

          this.handleShowMessage(
            "success",
            "Successfully",
            "Start the BOT operation!"
          );
        })
        .catch((err) => {
          this.handleShowMessage("error", "FAILED", err.response);
        });
    },

    handleShowMessage(type, title, content) {
      notification[type]({
        title: title,
        meta: content,
        duration: 3000,
      });
    },

    async submitCallback(botId) {
      const res = await axios
        .post("/bot-remove", { botId: botId })
        .then(() => {
          this.handleShowMessage(
            "success",
            "Successfully",
            "Removing BOT successfully!"
          );
          this.showModalDelete = false;
        })
        .catch(() => {
          this.handleShowMessage(
            "error",
            "FAILED",
            "Cannot remove bot, please double-check again!"
          );
        });
    },
  },

  setup() {
    const bots = ref({});
    const botStatus = ref({});

    const response = async () => {
      const trade = await axios.get("user/trading");

      if (trade) {
        bots.value = trade.data.bots;
        botStatus.value = Object.fromEntries(
          Object.entries(bots.value).map(([key, value]) => [
            key,
            value.config.status === "STOP",
          ])
        );
      }
    };
    response();

    onMounted(() => {
      const channel = pusher.subscribe(localStorage.getItem("username"));

      channel.bind("trading", (data) => {
        if (data) {
          bots.value = data.bots;
        }
      });
    });

    // onUnmounted(() => {
    //   pusher.unsubscribe("my-channel");
    // });

    return {
      showModal: ref(false),
      bots,
      selectedBot: null,
      botStatus,
      showModalDelete: ref(false),
    };
  },
});
</script>
