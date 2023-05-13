import React, { useEffect, useRef, useState } from "react";
import { GeocodePlace } from "../ApiInterfaces/ApiDefinitions/GeocodePlace";
import { getCoordinates } from "../ApiInterfaces/GeoCoding";
import { Box, TextField, MenuItem, Button } from "@mui/material";

export default function LocationSearch(props: {
  setLocation: (location: GeocodePlace | undefined) => void;
}) {
  const locationInput = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState<number>(-1);
  const [locations, setLocations] = useState<GeocodePlace[]>();
  const [placeName, setPlaceName] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    setLocation(-1);
    setLocations(undefined);

    if (placeName === "") {
      return;
    }

    (async () => {
      setSearching(true);
      let locations: GeocodePlace[] | GeocodePlace | undefined;
      locations = await getCoordinates(placeName);
      if (locations && !("length" in locations)) {
        locations = [locations];
      }

      if (!locations) {
        setSearching(false);
        return;
      }

      setLocations(locations);
      setSearching(false);
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
    if (!locations || locations.length === 0) {
      props.setLocation(undefined)
    } else {
      props.setLocation(locations[location]);
    }
  }, [location]);

  return <Box sx={{ display: "flex", width: "30em", margin: "auto" }}>
  {!locations && (
    <TextField
      disabled={searching}
      sx={{ flex: 1 }}
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
      sx={{ flex: 1 }}
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
    sx={{ flex: 0.25 }}
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
</Box>;
}
