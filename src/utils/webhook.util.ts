import ngrok from "ngrok";
import { Bot } from "grammy";
import { BotContext } from "@Types";
import { NGROK_PORT, NGROK_TOKEN } from "@env/bot.env";

const InitWebhook = async (bot: Bot<BotContext>) => {
  try {
    await bot.api.deleteWebhook();
    console.log("Trying to connect via NGROK");
    const url = await ngrok.connect({
      authtoken: NGROK_TOKEN,
      addr: NGROK_PORT,
      region: "eu",
    });
    console.log(`Successfully connected via NGROK - ${url}`);
    await bot.api.setWebhook(url);
  } catch (e) {
    console.log("Unable to connect via NGROK, using polling");
  }
};

export default InitWebhook;
