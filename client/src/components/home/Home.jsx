import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";

import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWeatherSunny } from "react-icons/ti";
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherShower } from "react-icons/ti";
import { TiWeatherStormy } from "react-icons/ti";
import { TiWeatherSnow } from "react-icons/ti";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { TiWeatherDownpour } from "react-icons/ti";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { API_KEY } from "../constants";

export default function Home() {
  const [data, setData] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [hour, setHour] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  console.log(lat, "lat");
  console.log(long, "long");

  useEffect(() => {
    if (lat && long) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
        )
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setDescription(response.data.weather);
        })
        .catch((error) => {
          console.log(error);
        });

      if (lat && long) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`
          )
          .then((response) => {
            console.log(response);
            setHour(response.data.list.slice(0, 6));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [lat, long]);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`;
    return strTime;
  };

  const date = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = date.getDay();
  const currentWeekday = weekdays[dayIndex];

  return (
    <>
      {data.length == 0 ? (
        <>
          <div
            className=""
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <SyncLoader color="#3697d6" size={20} speedMultiplier={1} />
          </div>
        </>
      ) : (
        <>
          <div className="container-fluid weather2">
            <div className="heads">
              <h1 className="text">{data.name}</h1>
              <h3 className="degree">
                <FaLongArrowAltDown />
                {(data?.main?.temp_min - 273.15).toFixed(1)}°
                <FaLongArrowAltUp />
                {(data?.main?.temp_max - 273.15).toFixed(1)}°
              </h3>
            </div>

            <div className="rowtwo">
              <p className="psize">
                {currentWeekday}
                <br />
                {getCurrentDate()} <br />
                <br />
                Wind {data?.wind?.speed}km/h
                <br />
                <WiHumidity />
                {data?.main?.humidity}%
              </p>
              <h2 className="icontext">
                {data.weather[0].main == "Sunny" ? (
                  <TiWeatherPartlySunny className="iconsize" />
                ) : (
                  ""
                )}

                {data.weather[0].main == "Clouds" ? (
                  <TiWeatherCloudy className="iconsize" />
                ) : (
                  ""
                )}

                {data.weather[0].main == "Rain" ? (
                  <TiWeatherShower className="iconsize" />
                ) : (
                  ""
                )}

                {description.length == 0 ? (
                  ""
                ) : (
                  <p className="sub">{data?.weather[0]?.main}</p>
                )}
              </h2>

              <h1 className="size">
                {(data?.main?.temp - 273.15).toFixed(1)}{" "}
                <span className="spancel">°</span>{" "}
              </h1>
            </div>
          </div>

          <div className="rowtwos">
            {hour.map((datas) => (
              <h3>
                {formatTime(datas.dt_txt)}
                <br />
                <br />
                {(datas.main.temp - 273.15).toFixed(2) > 26 ? (
                  <TiWeatherDownpour />
                ) : (
                  ""
                )}
                {(datas.main.temp - 273.15).toFixed(2) == 26 ? (
                  <TiWeatherShower />
                ) : (
                  ""
                )}
                {(datas.main.temp - 273.15).toFixed(2) < 26 ? (
                  <TiWeatherShower />
                ) : (
                  ""
                )}
                <br />

                <p className="degrees">
                  {(datas.main.temp - 273.15).toFixed(1)}°C
                </p>
                <br />
                <h5 className="descriptioncls">
                  {datas.weather[0].description}
                </h5>
              </h3>

            
            ))}
          </div>
          <br />
          <br />
        </>
      )}
    </>
  );
}
