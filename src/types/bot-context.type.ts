import { Context, SessionFlavor } from "grammy";
import { IBotConfig } from "@interfaces";

type BotContext = Context & {
  config: IBotConfig;
} & SessionFlavor<any>;

export default BotContext;
