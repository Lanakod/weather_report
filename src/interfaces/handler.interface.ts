import { Bot } from "grammy";
import { BotContext } from "@Types";

export default interface IHandler {
  init: (bot: Bot<BotContext>) => Promise<void>;
}
