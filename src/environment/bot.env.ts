export const TOKEN = process.env.TOKEN || "";
export const OWNER = Number(process.env.OWNER);
export const OPEN_WEATHER_TOKEN = process.env.OPEN_WEATHER_TOKEN;
export const NODE_ENV = process.env.NODE_ENV;
export const IS_PROD = NODE_ENV === "prod";

export const EXPRESS_PORT = process.env.EXPRESS_PORT || 3030;
