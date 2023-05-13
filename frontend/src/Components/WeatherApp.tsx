import { Box, Collapse, Container, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { GeocodePlace } from "../ApiInterfaces/ApiDefinitions/GeocodePlace";
import UnitSettings from "../ApiInterfaces/UnitSettings";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import ForecastDisplay from "./ForecastDisplay";
import HourlyDisplay from "./HourlyDisplay";
import LocationSearch from "./LocationSearch";

export default function WeatherApp() {
  const [unitSettings, setUnitSettings] = useState<UnitSettings>({
    windspeedUnit: "kmh",
    temperatureUnit: "fahrenheit",
    precipitationUnit: "inch",
  });
  const [location, setLocation] = useState<GeocodePlace>();
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <Box>
      <Container>
        <LocationSearch setLocation={setLocation} />
        <Collapse in={location != undefined}>
          <Tabs
            sx={{ width: "30em", margin: "auto" }}
            variant="fullWidth"
            indicatorColor="secondary"
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
          >
            <Tab label="Current" />
            <Tab label="Hourly" />
            <Tab label="7 day" />
          </Tabs>
        </Collapse>
        <CurrentWeatherDisplay active={activeTab === 0} location={location} unitSettings={unitSettings} />
        <HourlyDisplay active={activeTab === 1} location={location} unitSettings={unitSettings} />
      </Container>
      <ForecastDisplay active={activeTab === 2} location={location} unitSettings={unitSettings} />
    </Box>
  );
}