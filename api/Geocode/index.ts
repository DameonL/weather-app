import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const endpoint = "https://geocoding-api.open-meteo.com/v1/search";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const search = req.query.search;

  if (!search) {
    context.res.status = 400;
    return;
  }

  const params = new URLSearchParams();
  params.set("name", search);

  const uri = `${endpoint}?${params}`;
  
  const response = await fetch(uri);
  const body = await response.json();
  const results = body.results;

  context.res = {
    body: results
  };
};

export default httpTrigger;