import { Bot } from "grammy";
import glob from "glob-promise";
import path from "path";
import { BotContext } from "@Types";
import { IHandler } from "@interfaces";
import { Table } from "console-table-printer";

const InitHandlers = async (bot: Bot<BotContext>) => {
  const table = new Table({
    title: "Handlers Loaded",
  });
  const files = await glob(path.resolve("src", "handlers", "*.handler.ts"));
  await Promise.allSettled(
    files.map(async (f) => {
      const file = await import(f);
      const handler: IHandler = new file.default();
      if (!handler.name) {
        return table.addRow(
          { name: f.split("/").pop(), state: "Missing name" },
          {
            color: "red",
          }
        );
      }
      if (!handler.init) {
        return table.addRow(
          { name: handler.name, state: "Missing init" },
          {
            color: "red",
          }
        );
      }
      table.addRow(
        { name: handler.name, state: "Loaded" },
        {
          color: "green",
        }
      );
      await handler.init(bot);
    })
  );
  table.printTable();
};

export default InitHandlers;
