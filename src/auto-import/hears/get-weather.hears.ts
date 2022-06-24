import { IHears } from "@interfaces";
import { GetWeatherInMoscow } from "@api";
import { MAIN_KEYBOARD_GET_CURRENT_WEATHER } from "@const/keyboards/main.constant";
import {
  GATHERING_WEATHER_DATA,
  WEATHER_FORECAST_MSG,
} from "@const/messages/weather-messages.constant";

const hears: IHears = {
  trigger: MAIN_KEYBOARD_GET_CURRENT_WEATHER,
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

export default hears;
