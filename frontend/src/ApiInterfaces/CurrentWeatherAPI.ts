import { CurrentWeather } from "./ApiDefinitions/CurrentWeather";
import AppConfig from "../AppConfig";

const endpoint = "localhost:7071/api/CurrentWeather";

export default async function FetchCurrentWeather(latitude: string, longitude: string): Promise<CurrentWeather> {
  const query = new URLSearchParams();
  query.set("latitude", latitude);
  query.set("longitude", longitude);
  const targetUrl = `${AppConfig.development ? "http" : "https"}://${endpoint}?${query}`;
  const response = await fetch(targetUrl);
  const report = (await response.json()) as CurrentWeather;
  return report;
}