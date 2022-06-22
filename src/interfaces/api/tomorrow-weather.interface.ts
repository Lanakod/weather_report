interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface IWind {
  speed: number;
  deg: number;
  gust: number;
}

interface IWeather {
  dt: number;
  main: IMain;
  wind: IWind;
}

export default interface ITomorrowWeather {
  list: IWeather[];
}
