import { Context, SessionFlavor } from "grammy";
import { IBotConfig } from "@interfaces";
import { HydrateFlavor } from "@grammyjs/hydrate";

type BotContext = HydrateFlavor<Context> & {
  config: IBotConfig;
} & SessionFlavor<any>;

export default BotContext;
