import { config as DotEnvConfig } from "dotenv";
DotEnvConfig({
  path: `.env.${process.env.NODE_ENV}`,
});

import { Context, session, webhookCallback } from "grammy";
import { run, sequentialize } from "@grammyjs/runner";
import InitHandlers from "@handlers";
import bot from "./bot";
import { InitWebhook, UseCatcher } from "@utils";
import UseMenu from "@ui/menu";
import { hydrate } from "@grammyjs/hydrate";
import { apiThrottler } from "@grammyjs/transformer-throttler";
import InitMiddlewares from "@middlewares";
import express from "express";
import https from "https";
import * as fs from "fs";
import path from "path";

const Start = async () => {
  const app = express();
  app.use(express.json());

  app.use(webhookCallback(bot, "express"));
  const server = https.createServer(
    {
      key: fs.readFileSync(path.resolve("privkey.key")),
      cert: fs.readFileSync(path.resolve("cert.pem")),
    },
    app
  );
  server.listen(3030, "127.0.0.1", () => console.log("Listening on port 3030"));

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
  // await InitWebhook(bot);

  // const runner = run(bot);
  // if (runner.isRunning()) {
  //   await bot.init();
  //   console.log(`Bot started - @${bot.botInfo.username}`);
  // }
};

Start();
