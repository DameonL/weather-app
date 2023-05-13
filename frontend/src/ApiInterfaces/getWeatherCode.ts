import WeatherCodes from "../ApiInterfaces/WeatherCodes.json";

type WeatherCodeKey = keyof typeof WeatherCodes;

export default function getWeatherCode(code: string) {
  return WeatherCodes[code as WeatherCodeKey];
}