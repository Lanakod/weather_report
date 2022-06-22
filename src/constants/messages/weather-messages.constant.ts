export const GATHERING_WEATHER_DATA = "Собираю данные о погоде в Москве";
export const WEATHER_FORECAST_MSG = (
  temp: number,
  feels_like: number,
  pressure: number,
  speed: number,
  direction: string,
  humidity: number
) =>
  `Погода в <b>Москве</b>:\nТемпература: <b>${temp} °C</b>\nПо ощущениям: <b>${feels_like} °C</b>\nДавление: <b>${
    pressure * 0.75
  } мм. рт. ст.</b>\nВлажность: <b>${humidity}%</b>\n\nСкорость ветра: <b>${speed} м/с</b>\nНаправление ветра: <b>${direction}</b>`;
export const TOMORROW_WEATHER_FORECAST_MSG = (
  date: string,
  temp: number,
  feels_like: number,
  pressure: number,
  speed: number,
  direction: string,
  humidity: number
) =>
  `<b>${date}</b>\nТемпература: <b>${temp} °C</b>\nПо ощущениям: <b>${feels_like} °C</b>\nДавление: <b>${
    pressure * 0.75
  } мм. рт. ст.</b>\nВлажность: <b>${humidity}%</b>\nСкорость ветра: <b>${speed} м/с</b>\nНаправление ветра: <b>${direction}</b>`;
