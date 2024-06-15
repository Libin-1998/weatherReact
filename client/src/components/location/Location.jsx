import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Location() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [status, setStatus] = useState(null);

  const requestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setStatus("Location obtained successfully!");
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setStatus("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setStatus("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setStatus("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setStatus("An unknown error occurred.");
              break;
            default:
              setStatus("An error occurred while fetching location.");
          }
        }
      );
    } else {
      setStatus("Geolocation is not supported by your browser.");
    }
  };

  return (
    <>
      <div>
        <h1>Location Permission Request</h1>
        <p>Please turn on your location</p>
        <button onClick={requestLocation}>Get Location</button>
        <p>Status: {status}</p>
        {location.latitude && location.longitude && (
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        )}
      </div>
    </>
  );
}
