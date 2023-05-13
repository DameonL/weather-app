export default interface HourlyWeather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: {
    time: string;
    weathercode: string;
    temperature_2m: string;
    relativehumidity_2m: string;
    precipitation_probability: string;
  };
  hourly: {
    time: string[];
    weathercode: number[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    precipitation_probability: number[];
  };
}
