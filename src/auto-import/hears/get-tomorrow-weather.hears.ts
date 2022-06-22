import { IHears } from "@interfaces";
import { GetTomorrowWeatherInMoscow, GetWeatherInMoscow } from "@api";
import {
  MAIN_KEYBOARD_GET_CURRENT_WEATHER,
  MAIN_KEYBOARD_GET_WEATHER_FOR_DAY,
} from "@const/keyboards/main.constant";
import {
  GATHERING_WEATHER_DATA,
  TOMORROW_WEATHER_FORECAST_MSG,
  WEATHER_FORECAST_MSG,
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
    await ctx.reply(messages.join("\n\n"), {
      parse_mode: "HTML",
    });
    await msg.delete().catch(() => {});
  },
};

export default hears;
