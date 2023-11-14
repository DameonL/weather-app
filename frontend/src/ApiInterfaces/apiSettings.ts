import AppConfig from "../AppConfig";

const apiSettings = {
  endpoint: AppConfig.development ? "http://localhost:7071/api" : "https://weatherdameon.azurewebsites.net/api"
}

export default apiSettings;