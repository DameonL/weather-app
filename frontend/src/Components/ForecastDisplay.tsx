import { Box, Card, CardContent, CardHeader, CircularProgress, Collapse, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Forecast } from "../ApiInterfaces/ApiDefinitions/Forecast";
import FetchForecast from "../ApiInterfaces/FetchForecast";
import getWeatherCode from "../ApiInterfaces/getWeatherCode";
import WeatherDisplayProps from "./WeatherDisplayProps";

export default function ForecastDisplay(props: WeatherDisplayProps) {
  const [forecast, setForecast] = useState<Forecast>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setForecast(undefined);
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
      const weather = await FetchForecast(
        props.location.latitude.toString(),
        props.location.longitude.toString(),
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        props.unitSettings
      );
      setLoading(false);
      setForecast(weather);
    })();
  }, [props.active, props.location]);

  if (!props.location || !forecast) {
    return null;
  }

  if (loading) {
    return (
      <Card sx={{ maxWidth: "30em", margin: "auto" }} variant="outlined">
        <CircularProgress />
      </Card>
    );
  }

  return (
    <Collapse orientation="vertical" in={!(!props.location || !forecast || !props.active)}>
      <Card variant="outlined">
        <CardContent>
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 6.85, sm: 3.43, md: 1.714 }}
            sx={{ justifyContent: "center", backgroundColor: "#E7EBF0" }}
          >
            {forecast.daily.time.map((time, index) => (
              <ForecastDay key={index} day={index} forecast={forecast} />
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Collapse>
  );
}

function ForecastDay(props: { day: number; forecast: Forecast }) {
  return (
    <Grid
      item
      sx={{
        minWidth: "10em",
        backgroundColor: "white",
        borderRadius: "1em",
        border: "1px solid lightgrey",
        margin: "0.5em",
        padding: "0.5em",
      }}
    >
      <Typography>
        {new Date(props.forecast.daily.time[props.day]).toLocaleDateString("en-us", {
          weekday: "long",
          month: "short",
          day: "2-digit",
          timeZone: "UTC",
        })}
      </Typography>
      <Box>
        <Typography>
          {props.forecast.daily.temperature_2m_min[props.day]}
          {props.forecast.daily_units.temperature_2m_min} / {props.forecast.daily.temperature_2m_max[props.day]}
          {props.forecast.daily_units.temperature_2m_max}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>
            {getWeatherCode(props.forecast.daily.weathercode[props.day].toString()).day.description}
          </Typography>
          <img
            style={{ width: "3em" }}
            src={getWeatherCode(props.forecast.daily.weathercode[props.day].toString()).day.image}
          />
        </Box>
      </Box>
    </Grid>
  );
}
