import glob from "glob-promise";
import path from "path";
import { ICommand, IHandler } from "@interfaces";
import { BotContext } from "@Types";
import { Table } from "console-table-printer";
import { IS_PROD } from "@env/bot.env";
import CustomBot from "../types/custom-bot";

export default class CommandsHandler implements IHandler {
  name = "Commands";
  init = async (bot: CustomBot<BotContext>) => {
    const table = new Table({
      title: "Commands Loaded",
    });
    const files = await glob(
      path.resolve("src", "auto-import", "commands", "*.command.ts")
    );
    const commands: ICommand[] = [];
    await Promise.allSettled(
      files.map(async (f) => {
        const file = (await import(f)).default as ICommand;
        if (IS_PROD && file.inDevOnly) return;
        if (!file.command)
          return table.addRow(
            { name: f.split("/").pop(), state: "Missing name" },
            {
              color: "red",
            }
          );
        if (!file.description)
          return table.addRow(
            { name: file.command, state: "Missing description" },
            {
              color: "red",
            }
          );
        if (!file.callback)
          return table.addRow(
            { name: file.command, state: "Missing callback" },
            {
              color: "red",
            }
          );
        table.addRow(
          {
            name: file.command,
            state: "Loaded",
            hidden: file.hidden ? "Yes" : "No",
          },
          {
            color: "green",
          }
        );
        bot.handlers.commands.push(file);
      })
    );
    table.printTable();
    await bot.api.setMyCommands(bot.handlers.commands.filter((c) => !c.hidden));
  };
}
