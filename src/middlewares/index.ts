import { Bot, Middleware } from "grammy";
import glob from "glob-promise";
import path from "path";
import { BotContext } from "@Types";
import { Table } from "console-table-printer";

const InitMiddlewares = async (bot: Bot<BotContext>) => {
  const table = new Table({
    title: "Middlewares",
  });
  const files = await glob(
    path.resolve("src", "middlewares", "*.middleware.ts")
  );
  await Promise.allSettled(
    files.map(async (f) => {
      const middleware: Middleware<BotContext> = (await import(f)).default;
      table.addRow(
        { name: f.split("/").pop(), state: "Loaded" },
        {
          color: "green",
        }
      );
      bot.use(middleware);
    })
  );
  table.printTable();
};

export default InitMiddlewares;
