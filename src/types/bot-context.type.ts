import { SessionFlavor } from "grammy";
import { IBotConfig } from "@interfaces";
import { HydrateFlavor } from "@grammyjs/hydrate";
import { ParseModeContext } from "@grammyjs/parse-mode";

type BotContext = HydrateFlavor<ParseModeContext> & {
  config: IBotConfig;
} & SessionFlavor<any>;

export default BotContext;
