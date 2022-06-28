import { ICommand } from "@interfaces";
import WeatherMenu from "@ui/menu/weather.menu";

const command: ICommand = {
  command: "id",
  hidden: true,
  description: "Get your id",
  callback: async (ctx) => {
    if (ctx.config.isOwner)
      await ctx.reply(`Bot id - "${ctx.me.id}\nYour id - ${ctx.from?.id}"`, {
        reply_markup: WeatherMenu,
      });
  },
};

export default command;
