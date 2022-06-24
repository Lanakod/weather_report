import axios from "axios";
import { ITomorrowWeather } from "@interfaces";
import { OPEN_WEATHER_TOKEN } from "@env/bot.env";

const GetTomorrowWeatherInMoscow = async () => {
  const res = await axios.get<ITomorrowWeather>(
    `https://api.openweathermap.org/data/2.5/forecast?q=Moscow&units=metric&lang=ru&cnt=8&appid=${OPEN_WEATHER_TOKEN}`
  );
  return res.data.list.map((l) => {
    const date = new Date(l.dt * 1000);
    const {
      main: { temp, feels_like, pressure, humidity },
      wind: { speed, deg },
    } = l;

    const directions = [
      "Северный",
      "Северо-восточный",
      "Восточный",
      "Юго-восточный",
      "Южный",
      "Юго-западный",
      "Западный",
      "Северо-западный",
    ];

    const degrees = (Math.round((deg * 8) / 360) + 8) % 8;
    return {
      date: date.toLocaleString(),
      temp,
      feels_like,
      pressure,
      speed,
      humidity,
      direction: directions[degrees],
    };
  });
};

export default GetTomorrowWeatherInMoscow;
