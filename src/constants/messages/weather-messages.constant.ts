export const GATHERING_WEATHER_DATA = "Собираю данные о погоде в Москве";
export const WEATHER_FORECAST_MSG = (
  temp: number,
  feels_like: number,
  pressure: number,
  speed: number,
  direction: string
) =>
  `Погода в <b>Москве</b>:\nТемпература: <b>${temp} °C</b>\nПо ощущениям: <b>${feels_like} °C</b>\nДавление: <b>${
    pressure * 0.75
  } мм. рт. ст.</b>\n\nВетер:\nСкорость: <b>${speed} м/с</b>\nНаправление: <b>${direction}</b>`;
