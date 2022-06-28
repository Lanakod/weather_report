import { Menu } from "@grammyjs/menu";
import { GetWeatherInMoscow } from "@api";
import {
  WEATHER_MENU_ID,
  WEATHER_MENU_NAME,
} from "@const/menus/weather.constant";

export default new Menu(WEATHER_MENU_ID).webApp(
  WEATHER_MENU_NAME,
  "https://tg.lanakod.host"
);
