import { Box, Button, Card, CardContent, CircularProgress, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { CurrentWeather } from "./ApiInterfaces/ApiDefinitions/CurrentWeather";
import { GeocodePlace } from "./ApiInterfaces/ApiDefinitions/GeocodePlace";
import FetchCurrentWeather from "./ApiInterfaces/CurrentWeatherAPI";
import { getCoordinates } from "./ApiInterfaces/GeoCodingApi";
import WeatherCodes from "./ApiInterfaces/WeatherCodes.json";

export default function CurrentWeatherDisplay() {
  const locationInput = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState<number>(-1);
  const [locations, setLocations] = useState<GeocodePlace[]>();
  const [placeName, setPlaceName] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();

  useEffect(() => {
    setLocation(-1);
    setLocations(undefined);
    setCurrentWeather(undefined);

    if (placeName === "") {
      return;
    }

    (async () => {
      setSearching(true);
      let locations: GeocodePlace[] | GeocodePlace;
      locations = await getCoordinates(placeName);
      if (locations && !("length" in locations)) {
        locations = [locations];
      }

      setLocations(locations);
    })();
  }, [placeName]);

  useEffect(() => {
    if (locations && locations.length > 0) {
      setLocation(0);
    } else {
      setLocation(-1);
    }
  }, [locations]);

  useEffect(() => {
    (async () => {
      if (location < 0 || !locations) {
        setSearching(false);
        return;
      }

      const currentWeather = await FetchCurrentWeather(
        locations[location].latitude.toString(),
        locations[location].longitude.toString()
      );
      setCurrentWeather(currentWeather);
      setSearching(false);
    })();
  }, [location]);

  return (
    <div>
      <div>
        <Box style={{ display: "flex", width: "30em" }}>
          {!locations && (
            <TextField
              disabled={searching}
              style={{ flex: 1 }}
              ref={locationInput}
              label="City/Zip Code"
              variant="standard"
              defaultValue={placeName}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  if (
                    event.target &&
                    "value" in event.target &&
                    "value" in event.target &&
                    typeof event.target.value === "string"
                  ) {
                    setPlaceName(event.target.value);
                    if ("blur" in event.target && typeof event.target.blur === "function") {
                      event.target?.blur();
                    }
                  }
                }
              }}
            />
          )}
          {locations && location > -1 && (
            <TextField
              disabled={searching}
              style={{ flex: 1 }}
              ref={locationInput}
              label="Select a City"
              variant="standard"
              select={true}
              value={location}
              onChange={(event) => {
                setLocation(event.target.value ? Number(event.target.value) : 0);
              }}
            >
              {locations?.map((x, index) => (
                <MenuItem key={x.id} value={index}>
                  {x.name}
                  {x.admin1 && `, ${x.admin1}`} ({x.country_code})
                </MenuItem>
              ))}
            </TextField>
          )}
          <Button
            disabled={searching}
            style={{ flex: 0.25 }}
            variant="contained"
            color={locations ? "error" : "primary"}
            onClick={() => {
              if (!locations) {
                setPlaceName(locationInput.current?.querySelector<HTMLInputElement>("input")?.value ?? "");
              } else {
                setPlaceName("");
              }
            }}
          >
            {locations ? "Clear" : "Search"}
          </Button>
        </Box>
        {currentWeather && (
          <Card style={{ maxWidth: "30em" }} variant="outlined">
            {/* <CardHeader
              subheader={`Current weather for ${locations?.[location].name}:`}
              action={
                <>
                  <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`} />
                </>
              }
            /> */}
            <CardContent>
              <Typography>Current Temperature: {currentWeather.current_weather.temperature}</Typography>
              <Typography>{WeatherCodes.find(x => x.code === currentWeather.current_weather.weathercode.toString())?.description}</Typography>
              <Typography>
                Wind: {currentWeather.current_weather.windspeed}mph {currentWeather.current_weather.winddirection}
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
      {searching && (
        <Card variant="outlined" style={{ maxWidth: "30em" }}>
          <Typography>Searching...</Typography>
          <CircularProgress />
        </Card>
      )}
    </div>
  );
}
