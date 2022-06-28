import { config as DotEnvConfig } from "dotenv";
DotEnvConfig({
  path: `.env.${process.env.NODE_ENV}`,
});

import { Context, session, webhookCallback } from "grammy";
import { run, sequentialize } from "@grammyjs/runner";
import InitHandlers from "@handlers";
import bot from "./bot";
import { UseCatcher } from "@utils";
import UseMenu from "@ui/menu";
import { hydrate } from "@grammyjs/hydrate";
import { apiThrottler } from "@grammyjs/transformer-throttler";
import InitMiddlewares from "@middlewares";
import express from "express";
import https from "https";
import http from "http";
import * as fs from "fs";
import path from "path";
import { EXPRESS_PORT, IS_PROD } from "@env/bot.env";

const Start = async () => {
  if (IS_PROD) {
    const app = express();
    app.use(express.json());

    app.use(webhookCallback(bot, "express"));

    const key = fs.existsSync(path.resolve("privkey.key"))
      ? fs.readFileSync(path.resolve("privkey.key"))
      : null;
    const cert = fs.existsSync(path.resolve("cert.pem"))
      ? fs.readFileSync(path.resolve("cert.pem"))
      : null;

    const server =
      !key || !cert
        ? http.createServer(app)
        : https.createServer(
            {
              key,
              cert,
            },
            app
          );
    server.listen(
      {
        port: EXPRESS_PORT,
        host: "127.0.0.1",
      },
      () =>
        console.log(
          `Listening on ${
            !key || !cert ? "http" : "https"
          }://127.0.0.1:${EXPRESS_PORT}`
        )
    );

    process.once("SIGINT", () => {
      console.log("SIGINT signal received: closing server");
      server.close(() => console.log("Server stoped"));
    });
    process.once("SIGTERM", () => {
      console.log("SIGTERN signal received: closing server");
      server.close(() => console.log("Server stoped"));
    });
  }

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

  if (!IS_PROD) {
    const runner = run(bot);
    if (runner.isRunning()) {
      await bot.init();
      console.log(`Bot started - @${bot.botInfo.username}`);
    }
  }

  bot.on(":web_app_data", async (ctx) => {
    await ctx.reply("Да, это работающее веб-приложение!");
  });
};

Start();
