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
    const msg = await ctx.reply(GATHERING_WEATHER_DATA);
    const { pressure, feels_like, temp, speed, direction, humidity } =
      await GetWeatherInMoscow();
    setTimeout(
      async () =>
        msg.editText(
          WEATHER_FORECAST_MSG(
            temp,
            feels_like,
            pressure,
            speed,
            direction,
            humidity
          ),
          {
            parse_mode: "HTML",
          }
        ),
      1000
    );
  },
};

export default command;
