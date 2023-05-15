import React, { useEffect, useRef, useState } from "react";
import { GeocodePlace } from "../ApiInterfaces/ApiDefinitions/GeocodePlace";
import { getCoordinates } from "../ApiInterfaces/GeoCoding";
import { Box, TextField, MenuItem, Button } from "@mui/material";

export default function LocationSearch(props: { setLocation: (location: GeocodePlace | undefined) => void }) {
  const locationInput = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState<number>(-1);
  const [locations, setLocations] = useState<GeocodePlace[]>();
  const [placeName, setPlaceName] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const placeName = params.get("search");
    const location = params.get("location");
    if (!placeName || !location) {
      return;
    }

    setPlaceName(placeName);
    setLocation(Number(location));
  }, []);

  useEffect(() => {
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
      const params = new URLSearchParams();
      params.set("search", placeName);
      params.set("location", location.toString());
      window.history.replaceState(null, "", `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params}`);
    } else {
      setLocation(-1);
    }
  }, [locations]);

  useEffect(() => {
    if (!locations || locations.length === 0) {
      props.setLocation(undefined);
    } else {
      props.setLocation(locations[location]);
    }
    const params = new URLSearchParams();
    params.set("search", placeName);
    params.set("location", location.toString());
    window.history.replaceState(null, "", `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params}`);
  }, [location]);

  return (
    <Box sx={{ display: "flex", margin: "auto", width: "95%" }}>
      {!locations && (
        <TextField
          sx={{ width: "75%" }}
          disabled={searching}
          ref={locationInput}
          label="City/Zip Code"
          variant="standard"
          defaultValue={placeName}
          autoFocus={true}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              if (
                event.target &&
                "value" in event.target &&
                "value" in event.target &&
                typeof event.target.value === "string"
              ) {
                setPlaceName(event.target.value);
                setLocation(-1);
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
          sx={{ width: "75%" }}
          ref={locationInput}
          label="Select a City"
          variant="standard"
          select={true}
          value={location}
          onChange={(event) => {
            setLocation(event.target.value ? Number(event.target.value) : 0);
            const params = new URLSearchParams();
            params.set("search", placeName);
            params.set("location", location.toString());
            window.history.replaceState(null, "", `${window.location.protocol}//${window.location.host}${window.location.pathname}?${params}`);
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
        sx={{ width: "25%" }}
        variant="contained"
        color={locations ? "error" : "primary"}
        onClick={() => {
          if (!locations) {
            setLocation(-1);
            setPlaceName(locationInput.current?.querySelector<HTMLInputElement>("input")?.value ?? "");
          } else {
            setLocation(-1);
            setPlaceName("");
          }
        }}
      >
        {locations ? "Clear" : "Search"}
      </Button>
    </Box>
  );
}
