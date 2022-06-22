import axios from "axios";
import { IWeather } from "@interfaces";

const GetWeatherInMoscow = async () => {
  const res = await axios.get<IWeather>(
    "https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=d5dadd8cefa8601da8b2dc8ade114b5e"
  );
  const {
    main: { temp, feels_like, pressure },
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
    direction: directions[degrees],
  };
};

export default GetWeatherInMoscow;
