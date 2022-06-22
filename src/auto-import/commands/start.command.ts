import { MainKeyboard } from "@ui/keyboards";
import { ICommand } from "@interfaces";

const command: ICommand = {
  command: "start",
  hidden: true,
  description: "Начальное приветствие",
  callback: async (ctx) => {
    const owner =
      "Данный бот собирает погодные данные из OpenWeatherMap и предоставляет информацию о погоде в городе Москва\n\nВам доступны команды:\n/weather - Узнать погоду\n/tomorrow - Получить прогноз погоды на 24 часа\n/id - узнать id вашего аккаунта и бота";
    const user =
      "Данный бот собирает погодные данные из OpenWeatherMap и предоставляет информацию о погоде в городе Москва\n\nВам доступны команды:\n/weather - Узнать погоду\n/tomorrow - Получить прогноз погоды на 24 часа";
    await ctx.reply(ctx.config.isOwner ? owner : user, {
      reply_markup: {
        keyboard: MainKeyboard.build(),
        resize_keyboard: true,
      },
    });
  },
};

export default command;
