import { Bot } from "grammy";
import glob from "glob-promise";
import path from "path";
import { BotContext } from "@Types";
import { IHandler } from "@interfaces";

const InitHandlers = async (bot: Bot<BotContext>) => {
  const files = await glob(path.resolve("src", "handlers", "*.handler.ts"));
  await Promise.allSettled(
    files.map(async (f) => {
      const file = await import(f);
      const handler: IHandler = new file.default();
      await handler.init(bot);
    })
  );
};

export default InitHandlers;
