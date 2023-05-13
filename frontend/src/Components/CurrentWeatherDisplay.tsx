import { Box, Card, CardContent, CardMedia, CircularProgress, Collapse, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CurrentWeather } from "../ApiInterfaces/ApiDefinitions/CurrentWeather";
import FetchCurrentWeather from "../ApiInterfaces/FetchCurrentWeather";
import { degreesToDirection } from "../ApiInterfaces/GeoCoding";
import getWeatherCode from "../ApiInterfaces/getWeatherCode";
import WeatherDisplayProps from "./WeatherDisplayProps";

export default function CurrentWeatherDisplay(props: WeatherDisplayProps) {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCurrentWeather(undefined);
  }, [props.location]);

  useEffect(() => {
    if (!props.active) {
      return;
    }

    (async () => {
      if (!props.location) {
        return;
      }

      setLoading(true);
      const weather = await FetchCurrentWeather(
        props.location.latitude.toString(),
        props.location.longitude.toString(),
        props.unitSettings
      );
      setLoading(false);
      setCurrentWeather(weather);
    })();
  }, [props.active, props.location]);

  if (loading) {
    return (
      <Card sx={{ maxWidth: "30em", margin: "auto" }} variant="outlined">
        <CircularProgress sx={{ margin: "auto" }} />
      </Card>
    );
  }

  return (
    <Collapse orientation="vertical" in={!(!props.location || !currentWeather || !props.active)}>
      {props.location && currentWeather && (
        <Card sx={{ maxWidth: "30em", margin: "auto" }} variant="outlined">
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Typography>
                {currentWeather.current_weather.is_day
                  ? getWeatherCode(currentWeather.current_weather.weathercode.toString()).day.description
                  : getWeatherCode(currentWeather.current_weather.weathercode.toString()).night.description}
              </Typography>
              <CardMedia
                component="img"
                sx={{ width: "50px" }}
                image={
                  currentWeather.current_weather.is_day
                    ? getWeatherCode(currentWeather.current_weather.weathercode.toString()).day.image
                    : getWeatherCode(currentWeather.current_weather.weathercode.toString()).night.image
                }
              />
            </Box>
            <Typography>Temperature: {currentWeather.current_weather.temperature}</Typography>
            <Typography>
              Wind: {currentWeather.current_weather.windspeed}mph{" "}
              {degreesToDirection(currentWeather.current_weather.winddirection)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Collapse>
  );
}
