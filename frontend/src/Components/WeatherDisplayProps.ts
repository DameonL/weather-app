import { GeocodePlace } from "../ApiInterfaces/ApiDefinitions/GeocodePlace";
import UnitSettings from "../ApiInterfaces/UnitSettings";

export default interface WeatherDisplayProps {
  active: boolean;
  location?: GeocodePlace;
  unitSettings: UnitSettings;
}
