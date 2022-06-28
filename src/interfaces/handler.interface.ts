import { BotContext } from "@Types";
import CustomBot from "../types/custom-bot";

export default interface IHandler {
  name: string;
  init: (bot: CustomBot<BotContext>) => Promise<void>;
}
