import axios from "axios";
import { IWeather } from "@interfaces";
import { OPEN_WEATHER_TOKEN } from "@env/bot.env";

const GetWeatherInMoscow = async () => {
  const res = await axios.get<IWeather>(
    `https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=${OPEN_WEATHER_TOKEN}`
  );
  const {
    main: { temp, feels_like, pressure, humidity },
    wind: { speed, deg },
  } = res.data;

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
    temp,
    feels_like,
    pressure,
    speed,
    humidity,
    direction: directions[degrees],
  };
};

export default GetWeatherInMoscow;
