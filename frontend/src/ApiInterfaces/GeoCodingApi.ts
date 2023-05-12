import { CurrentWeather } from "./ApiDefinitions/CurrentWeather";
import { GeocodePlace } from "./ApiDefinitions/GeocodePlace";
import AppConfig from "../AppConfig";

const endpoint = "localhost:7071/api/Geocode";

export async function getCoordinates(place: string): Promise<GeocodePlace[] | GeocodePlace> {
  const query = new URLSearchParams();
  query.set("search", place);

  const targetUrl = `${AppConfig.development ? "http" : "https"}://${endpoint}?${query}`;
  const response = await fetch(targetUrl);
  const report = (await response.json()) as GeocodePlace[];
  return report;
}
