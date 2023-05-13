import { CurrentWeather } from "./ApiDefinitions/CurrentWeather";
import { GeocodePlace } from "./ApiDefinitions/GeocodePlace";
import AppConfig from "../AppConfig";
import apiSettings from "./apiSettings";

const route = "Geocode";

export async function getCoordinates(place: string): Promise<GeocodePlace[] | GeocodePlace | undefined> {
  const query = new URLSearchParams();
  query.set("search", place);

  const targetUrl = `${apiSettings.endpoint}/${route}?${query}`;
  const response = await fetch(targetUrl);

  try {
    const report = (await response.json()) as (GeocodePlace[] | GeocodePlace);
    return report;
  } catch (error) {
    return;
  }
}

const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

export function degreesToDirection(degrees: number) {
  if (degrees === 360) {
    degrees = 0;
  }
  
  const degreesPerDirection = 360 / directions.length;
  return directions[Math.ceil(degrees / degreesPerDirection)];
}