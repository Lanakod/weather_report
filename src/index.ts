import { config as DotEnvConfig } from "dotenv";
DotEnvConfig({
  path: `.env.${process.env.NODE_ENV}`,
});

import { Context, session } from "grammy";
import { run, sequentialize } from "@grammyjs/runner";
import InitHandlers from "@handlers";
import bot from "./bot";
import { InitWebhook, UseCatcher } from "@utils";
import UseMenu from "@ui/menu";
import { hydrate } from "@grammyjs/hydrate";
import { apiThrottler } from "@grammyjs/transformer-throttler";
import InitMiddlewares from "@middlewares";

const Start = async () => {
  UseCatcher(bot);

  const getSessionKey = (ctx: Context) => {
    return ctx.chat?.id.toString();
  };

  bot.api.config.use(apiThrottler());

  bot.use(hydrate());
  bot.use(sequentialize(getSessionKey));
  bot.use(session({ getSessionKey }));

  await InitMiddlewares(bot);

  UseMenu(bot);

  await InitHandlers(bot);
  await InitWebhook(bot);

  const runner = run(bot);
  if (runner.isRunning()) {
    await bot.init();
    console.log(`Bot started - @${bot.botInfo.username}`);
  }
};

Start();
