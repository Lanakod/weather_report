import { InlineQueryContext } from "grammy";
import { BotContext } from "@Types";

export default interface IInlineQuery {
  trigger: string | RegExp;
  callback: (ctx: InlineQueryContext<BotContext>) => any;
}
