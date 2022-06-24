import { IInlineQuery } from "@interfaces";
import { GetWeatherInMoscow } from "@api";
import { WEATHER_FORECAST_MSG } from "@const/messages/weather-messages.constant";

const query: IInlineQuery = {
  trigger: /[П,п]огода/,
  callback: async (ctx) => {
    const { pressure, feels_like, temp, speed, direction, humidity } =
      await GetWeatherInMoscow();
    await ctx.answerInlineQuery(
      [
        {
          type: "article",
          id: "weather-in-moscow",
          title: `Узнать погоду`,
          input_message_content: {
            message_text: WEATHER_FORECAST_MSG(
              temp,
              feels_like,
              pressure,
              speed,
              direction,
              humidity
            ),
            parse_mode: "HTML",
          },
          description: "Узнать текущую погоду в городе Москва",
        },
      ],
      { cache_time: 300 }
    );
  },
};

export default query;
