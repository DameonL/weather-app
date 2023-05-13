import {
  Card,
  CardContent,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import HourlyWeather from "../ApiInterfaces/ApiDefinitions/HourlyWeather";
import FetchHourly from "../ApiInterfaces/FetchHourly";
import getWeatherCode from "../ApiInterfaces/getWeatherCode";
import WeatherDisplayProps from "./WeatherDisplayProps";

export default function HourlyDisplay(props: WeatherDisplayProps) {
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather>();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    if (!props.location) {
      setHourlyWeather(undefined);
      return;
    }

    if (!props.active) {
      return;
    }

    (async () => {
      if (!props.location) {
        return;
      }
      setPage(0);

      const currentWeather = await FetchHourly(
        props.location.latitude.toString(),
        props.location.longitude.toString(),
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        props.unitSettings
      );

      var now = new Date();
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);

      while (new Date(currentWeather.hourly.time[0]).valueOf() < now.valueOf()) {
        currentWeather.hourly.time.splice(0, 1);
        currentWeather.hourly.precipitation_probability.splice(0, 1);
        currentWeather.hourly.temperature_2m.splice(0, 1);
        currentWeather.hourly.relativehumidity_2m.splice(0, 1);
        currentWeather.hourly.weathercode.splice(0, 1);
      }

      setHourlyWeather(currentWeather);
    })();
  }, [props.active, props.location]);

  return (
    <Collapse orientation="vertical" in={!(!props.location || !hourlyWeather || !props.active)}>
      {props.location && hourlyWeather && (
        <Card sx={{ margin: "auto" }} variant="outlined">
          <CardContent>
            <Typography>Current weather for {props.location.name}:</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "3em" }}>Time</TableCell>
                  <TableCell style={{ width: "5em" }}>Temperature</TableCell>
                  <TableCell style={{ width: "5em" }}>Humidity</TableCell>
                  <TableCell style={{ width: "5em" }}>Precipitation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hourlyWeather.hourly.precipitation_probability.map((x, index) => {
                  if (index < page * rowsPerPage || index >= page * rowsPerPage + rowsPerPage) {
                    return null;
                  }

                  return <ForecastHour key={index} hour={index} forecast={hourlyWeather} page={page} />;
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={hourlyWeather.hourly.time.length}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(event, newPage) => {
                      setPage(newPage);
                    }}
                    onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      )}
    </Collapse>
  );
}

function ForecastHour(props: { hour: number; forecast: HourlyWeather; page: number }) {
  return (
    <TableRow>
      <TableCell>
        {new Date(props.forecast.hourly.time[props.hour]).toLocaleString("en-us", {
          month: "numeric",
          day: "numeric",
          hour: "numeric",
        })}
      </TableCell>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        {props.forecast.hourly.temperature_2m[props.hour]}
        {props.forecast.hourly_units.temperature_2m}
        <img
          style={{ width: "3em" }}
          src={getWeatherCode(props.forecast.hourly.weathercode[props.hour].toString()).day.image}
        />
      </TableCell>
      <TableCell>
        {props.forecast.hourly.relativehumidity_2m[props.hour]}
        {props.forecast.hourly_units.relativehumidity_2m}
      </TableCell>
      <TableCell>
        {props.forecast.hourly.precipitation_probability[props.hour]}
        {props.forecast.hourly_units.precipitation_probability}
      </TableCell>
    </TableRow>
  );
}