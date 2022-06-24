import { ICommand } from "@interfaces";
import { GetTomorrowWeatherInMoscow } from "@api";
import {
  GATHERING_WEATHER_DATA,
  TOMORROW_WEATHER_FORECAST_MSG,
} from "@const/messages/weather-messages.constant";

const command: ICommand = {
  command: "tomorrow",
  description: "Узнать погоду в Москве на завтра",
  callback: async (ctx) => {
    const msg = await ctx.reply(GATHERING_WEATHER_DATA);

    const forecast = await GetTomorrowWeatherInMoscow();
    const messages = forecast.map((f) =>
      TOMORROW_WEATHER_FORECAST_MSG(
        f.date,
        f.temp,
        f.feels_like,
        f.pressure,
        f.speed,
        f.direction,
        f.humidity
      )
    );
    setTimeout(
      async () =>
        await msg.editText(messages.join("\n\n"), {
          parse_mode: "HTML",
        }),
      1000
    );
  },
};

export default command;
