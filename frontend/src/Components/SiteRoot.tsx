import { ThemeProvider, createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";
import WeatherApp from "./WeatherApp";

export default function SiteRoot() {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          contrastThreshold: 4.5,
          primary: {
            main: "#B34D00",
          },
        },
      })}
    >
      <WeatherApp />
    </ThemeProvider>
  );
}
