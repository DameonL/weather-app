import { CurrentWeather } from "./ApiDefinitions/CurrentWeather";
import AppConfig from "../AppConfig";
import UnitSettings from './UnitSettings';
import apiSettings from "./apiSettings";
import applyUnitSettings from './applyUnitSettings';

const route = "CurrentWeather";

export default async function FetchCurrentWeather(latitude: string, longitude: string, unitSettings: UnitSettings): Promise<CurrentWeather> {
  const query = new URLSearchParams();
  query.set("latitude", latitude);
  query.set("longitude", longitude);
  applyUnitSettings(unitSettings, query);
  const targetUrl = `${apiSettings.endpoint}/${route}?${query}`;
  const response = await fetch(targetUrl);
  const report = (await response.json()) as CurrentWeather;
  return report;
}