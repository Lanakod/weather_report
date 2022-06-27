import { Keyboard } from "grammy";
import {
  MAIN_KEYBOARD_GET_CURRENT_WEATHER,
  MAIN_KEYBOARD_GET_WEATHER_FOR_DAY,
  MAIN_KEYBOARD_OPEN_WEBAPP,
} from "@const/keyboards/main.constant";

export default new Keyboard()
  .text(MAIN_KEYBOARD_GET_CURRENT_WEATHER)
  .text(MAIN_KEYBOARD_GET_WEATHER_FOR_DAY)
  .webApp(MAIN_KEYBOARD_OPEN_WEBAPP, 'https://tg.lanakod.host')
  .row();
