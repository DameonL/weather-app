import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios from "axios";

const endpoint = "https://api.open-meteo.com/v1/forecast";
const hourlyVariables = ["weathercode", "temperature_2m", "relativehumidity_2m", "precipitation_probability"];

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
  params.set("hourly", hourlyVariables.join(","));
  params.set("timezone", timezone);
  const uri = `${endpoint}?${params}`;

  let response: Response;
  let attempts = 5;
  while (!response && attempts > 0) {
    attempts--;
    try {
      response = await axios.get(uri);
      const body = await response.json();

      context.res = {
        body,
      };
    } catch {}
  }
};

export default httpTrigger;
