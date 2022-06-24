import { IHears } from "@interfaces";
import { GetTomorrowWeatherInMoscow } from "@api";
import { MAIN_KEYBOARD_GET_WEATHER_FOR_DAY } from "@const/keyboards/main.constant";
import {
  GATHERING_WEATHER_DATA,
  TOMORROW_WEATHER_FORECAST_MSG,
} from "@const/messages/weather-messages.constant";

const hears: IHears = {
  trigger: MAIN_KEYBOARD_GET_WEATHER_FOR_DAY,
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

export default hears;
