import AppConfig from "../AppConfig";

const apiSettings = {
  endpoint: AppConfig.development ? "http://localhost:7071/api" : "api"
}

export default apiSettings;