import { Menu } from "@grammyjs/menu";
import { GetWeatherInMoscow } from "@api";
import {
  WEATHER_MENU_ID,
  WEATHER_MENU_NAME,
} from "@const/menus/weather.constant";
import { WEATHER_FORECAST_MSG } from "@const/messages/weather-messages.constant";

export default new Menu(WEATHER_MENU_ID).text(
  WEATHER_MENU_NAME,
  async (ctx) => {
    const { pressure, feels_like, temp, speed, direction } =
      await GetWeatherInMoscow();
    await ctx.menu.close();
    return await ctx.reply(
      WEATHER_FORECAST_MSG(temp, feels_like, pressure, speed, direction),
      {
        parse_mode: "HTML",
      }
    );
  }
);
