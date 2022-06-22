import glob from "glob-promise";
import path from "path";
import { Bot } from "grammy";
import { IHandler, IHears } from "@interfaces";
import { BotContext } from "@Types";
import { Table } from "console-table-printer";

export default class CommandsHandler implements IHandler {
  init = async (bot: Bot<BotContext>) => {
    const table = new Table({
      title: "Hears Loaded",
    });
    const files = await glob(
      path.resolve("src", "auto-import", "hears", "*.hears.ts")
    );
    await Promise.allSettled(
      files.map(async (f) => {
        const file = (await import(f)).default as IHears;
        if (!file.trigger)
          return table.addRow(
            { name: f.split("/").pop(), state: "Missing trigger" },
            {
              color: "red",
            }
          );
        if (!file.callback)
          return table.addRow(
            { name: file.trigger, state: "Missing callback" },
            {
              color: "red",
            }
          );
        table.addRow(
          { name: file.trigger, state: "Loaded" },
          {
            color: "green",
          }
        );
        bot.hears(file.trigger, file.callback);
      })
    );
    table.printTable();
  };
}
