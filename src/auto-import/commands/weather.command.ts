import { ICommand } from "@interfaces";
import { GetWeatherInMoscow } from "@api";
import {
  GATHERING_WEATHER_DATA,
  WEATHER_FORECAST_MSG,
} from "@const/messages/weather-messages.constant";

const command: ICommand = {
  command: "weather",
  description: "Узнать погоду в Москве",
  callback: async (ctx) => {
    await ctx.reply(GATHERING_WEATHER_DATA);

    const { pressure, feels_like, temp, speed, direction } =
      await GetWeatherInMoscow();
    return await ctx.reply(
      WEATHER_FORECAST_MSG(temp, feels_like, pressure, speed, direction),
      {
        parse_mode: "HTML",
      }
    );
  },
};

export default command;
