import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const endpoint = "https://api.open-meteo.com/v1/forecast";
const dailyVariables = [
  "weathercode",
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset",
  "precipitation_probability_max",
  "windspeed_10m_max",
  "winddirection_10m_dominant",
];

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const timezone = req.query.timezone;
  const temperatureUnit = req.query.temperatureUnit;
  const windspeedUnit = req.query.windspeedUnit;
  const precipitationUnit = req.query.precipitationUnit;

  const params = new URLSearchParams();
  params.set("latitude", latitude);
  params.set("longitude", longitude);
  params.set("temperature_unit", temperatureUnit);
  params.set("windspeed_unit", windspeedUnit);
  params.set("precipitation_unit", precipitationUnit);
  params.set("daily", dailyVariables.join(","));
  params.set("timezone", timezone);
  const uri = `${endpoint}?${params}`;

  const response = await fetch(uri);
  const body = await response.json();

  context.res = {
    body,
  };
};

export default httpTrigger;
