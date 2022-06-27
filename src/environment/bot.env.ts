export const TOKEN = process.env.TOKEN || "";
export const OWNER = Number(process.env.OWNER);
export const NGROK_TOKEN = process.env.NGROK_TOKEN || "";
export const NGROK_PORT = process.env.NGROK_PORT || 2000;
export const OPEN_WEATHER_TOKEN = process.env.OPEN_WEATHER_TOKEN;
export const NODE_ENV = process.env.NODE_ENV
export const IS_PROD = NODE_ENV === 'prod'