import AppConfig from "../AppConfig";

const apiSettings = {
  endpoint: AppConfig.development ? "localhost:7071/api" : "api"
}

export default apiSettings;