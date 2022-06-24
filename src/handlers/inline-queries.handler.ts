import glob from "glob-promise";
import path from "path";
import { Bot } from "grammy";
import { IHandler, IInlineQuery } from "@interfaces";
import { BotContext } from "@Types";
import { Table } from "console-table-printer";

export default class InlineQueriesHandler implements IHandler {
  name = "Inline Queries";
  init = async (bot: Bot<BotContext>) => {
    const table = new Table({
      title: "Inline Queries",
    });
    const files = await glob(
      path.resolve("src", "auto-import", "inlineQueries", "*.query.ts")
    );
    bot.on("inline_query", (ctx) => ctx.answerInlineQuery([]));
    await Promise.allSettled(
      files.map(async (f) => {
        const file = (await import(f)).default as IInlineQuery;
        if (!file.trigger)
          return table.addRow(
            { name: f.split("/").pop(), state: "Missing name" },
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
        bot.inlineQuery(file.trigger, file.callback);
      })
    );
    table.printTable();
  };
}
