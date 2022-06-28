import { TOKEN } from "@env/bot.env";
import { BotContext } from "@Types";
import CustomBot from "./types/custom-bot";

const bot = new CustomBot<BotContext>(TOKEN, {
  client: {
    canUseWebhookReply: (method) => method === "sendChatAction",
  },
});

process.once("SIGINT", bot.stop);
process.once("SIGTERM", bot.stop);

export default bot;
