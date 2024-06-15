import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Location.css'


export default function Location() {
  const navigate=useNavigate()
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
          navigate('/home')
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
      <div className="spot">
        <p className="textlocation">Turn On Your Location For Weather</p>
        <button onClick={requestLocation} class="btn-donate">Get Location</button>
      </div>


   
    </>
  );
}
