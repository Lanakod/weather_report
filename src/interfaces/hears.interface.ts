import { HearsContext } from "grammy";
import { BotContext } from "@Types";

export default interface IHears {
  trigger: string | string[];
  callback: (ctx: HearsContext<BotContext>) => any;
}
