import AppConfig from "../AppConfig";
import { Forecast } from "./ApiDefinitions/Forecast";
import UnitSettings from "./UnitSettings";
import apiSettings from "./apiSettings";
import applyUnitSettings from "./applyUnitSettings";

const route = "Forecast";

export default async function FetchForecast(
  latitude: string,
  longitude: string,
  timezone: string,
  unitSettings: UnitSettings
): Promise<Forecast> {
  const query = new URLSearchParams();
  query.set("latitude", latitude);
  query.set("longitude", longitude);
  query.set("timezone", timezone);
  applyUnitSettings(unitSettings, query);
  const targetUrl = `${AppConfig.development ? "http" : "https"}://${apiSettings.endpoint}/${route}?${query}`;
  const response = await fetch(targetUrl);
  const report = (await response.json()) as Forecast;
  return report;
}
