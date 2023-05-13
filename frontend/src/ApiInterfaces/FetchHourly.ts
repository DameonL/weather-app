import AppConfig from "../AppConfig";
import HourlyWeather from "./ApiDefinitions/HourlyWeather";
import UnitSettings from "./UnitSettings";
import apiSettings from "./apiSettings";
import applyUnitSettings from "./applyUnitSettings";

const route = "Hourly";

export default async function FetchHourly(
  latitude: string,
  longitude: string,
  timezone: string,
  unitSettings: UnitSettings
): Promise<HourlyWeather> {
  const query = new URLSearchParams();
  query.set("latitude", latitude);
  query.set("longitude", longitude);
  query.set("timezone", timezone);
  applyUnitSettings(unitSettings, query);
  const targetUrl = `${apiSettings.endpoint}/${route}?${query}`;
  const response = await fetch(targetUrl);
  const report = (await response.json()) as HourlyWeather;
  return report;
}
