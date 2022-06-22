import { Middleware } from "grammy";
import { OWNER } from "@env/bot.env";
import { BotContext } from "@Types";

const isOwnerMiddleware: Middleware<BotContext> = async (ctx, next) => {
  ctx.config = {
    botOwner: OWNER,
    isOwner: ctx.from?.id === OWNER,
  };
  await next();
};

export default isOwnerMiddleware;
