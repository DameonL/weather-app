import React from "react";
import CurrentWeatherDisplay from "./CurrentWeatherDisplay";
import { ThemeProvider } from "@mui/material";

export default function SiteRoot() {
  return <ThemeProvider theme={{
    
  }}><CurrentWeatherDisplay /></ThemeProvider>
}
