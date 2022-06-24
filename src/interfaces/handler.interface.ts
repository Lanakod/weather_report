import { Bot } from "grammy";
import { BotContext } from "@Types";

export default interface IHandler {
  name: string;
  init: (bot: Bot<BotContext>) => Promise<void>;
}
