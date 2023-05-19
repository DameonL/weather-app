import { Box, Collapse, Container, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("activeTab");
    if (tabParam) {
      setActiveTab(Number(tabParam));
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("activeTab", activeTab.toString());
    window.history.replaceState(
      null,
      "",
      `${window.location.protocol}//${window.location.host}${window.location.pathname}?${urlParams}`
    );
  }, [activeTab]);

  return (
    <div>
      <LocationSearch setLocation={setLocation} />
      <Collapse in={location != undefined}>
        <Tabs
          centered
          sx={{ margin: "auto" }}
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
      <ForecastDisplay active={activeTab === 2} location={location} unitSettings={unitSettings} />
    </div>
  );
}
