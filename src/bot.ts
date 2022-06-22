import { Bot } from "grammy";
import { TOKEN } from "@env/bot.env";
import { BotContext } from "@Types";

const bot = new Bot<BotContext>(TOKEN, {
  client: {
    canUseWebhookReply: (method) => method === "sendChatAction",
  },
});

process.once("SIGINT", bot.stop);
process.once("SIGTERM", bot.stop);

export default bot;
