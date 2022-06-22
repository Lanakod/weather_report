import { config as DotEnvConfig } from "dotenv";
DotEnvConfig({
  path: `.env.${process.env.NODE_ENV}`,
});

import { Context, GrammyError, HttpError, session } from "grammy";
import { sequentialize } from "@grammyjs/runner";
import InitHandlers from "@handlers";
import bot from "./bot";
import { InitWebhook } from "@utils";
import UseMenu from "@ui/menu";
import { isOwnerMiddleware } from "@middlewares";
import UseCatcher from "./utils/errors-catcher.util";
import { hydrate } from "@grammyjs/hydrate";

const Start = async () => {
  UseCatcher(bot);

  const getSessionKey = (ctx: Context) => {
    return ctx.chat?.id.toString();
  };

  bot.use(hydrate());
  bot.use(sequentialize(getSessionKey));
  bot.use(session({ getSessionKey }));

  bot.use(isOwnerMiddleware);

  UseMenu(bot);

  await InitHandlers(bot);
  await InitWebhook(bot);

  await bot.start({
    onStart: (botInfo) => console.log(`Bot started - @${botInfo.username}`),
  });
};

Start();
