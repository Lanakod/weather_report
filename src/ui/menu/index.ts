import { Bot } from "grammy";
import weatherMenu from "./weather.menu";
import { BotContext } from "@Types";

const UseMenu = (bot: Bot<BotContext>) => {
  bot.use(weatherMenu);
};

export default UseMenu;
