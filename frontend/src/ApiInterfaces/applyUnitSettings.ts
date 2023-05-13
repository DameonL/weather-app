import UnitSettings from "./UnitSettings";

export default function applyUnitSettings(unitSettings: UnitSettings, params: URLSearchParams) {
  for (const [key, value] of Object.entries(unitSettings)) {
    params.set(key, value.toString());
  }
}