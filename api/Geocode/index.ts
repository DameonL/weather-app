import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import axios, { AxiosResponse } from "axios";

const endpoint = "https://geocoding-api.open-meteo.com/v1/search";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const search = req.query.search;

  if (!search) {
    context.res.status = 400;
    return;
  }

  const params = new URLSearchParams();
  params.set("name", search);

  let response: AxiosResponse<any, any>;
  let attempts = 5;
  while (!response && attempts > 0) {
    attempts--;
    try {
      response = await axios.get(endpoint, { params });
      const body = response.data.results;

      context.res = {
        body,
      };
    } catch {
      context.res.status = 500;
    }
  }
};

export default httpTrigger;
