import { Context } from "grammy/out/context";
import { Bot, BotConfig } from "grammy";
import { ICommand, IHears } from "@interfaces";

interface IHandlers {
  commands: ICommand[];
  hears: IHears[];
}

export default class CustomBot<C extends Context = Context> extends Bot<C> {
  handlers: IHandlers;

  constructor(token: string, config: BotConfig<C>) {
    super(token, config);
    this.handlers = {
      hears: [],
      commands: [],
    };
  }
}
