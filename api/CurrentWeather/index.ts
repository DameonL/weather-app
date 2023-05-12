import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const endpoint = "https://api.open-meteo.com/v1/forecast";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;

    const params = new URLSearchParams();
    params.set("latitude", latitude);
    params.set("longitude", longitude);
    params.set("temperature_unit", "fahrenheit");
    params.set("windspeed_unit", "mph");
    params.set("precipitation_unit", "inch");
    params.set("current_weather", "true");
    const uri = `${endpoint}?${params}`;
    
    const response = await fetch(uri);
    const body = await response.json();

    context.res = {
        body
    };
};

export default httpTrigger;