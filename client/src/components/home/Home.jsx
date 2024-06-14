import React, { useEffect, useState } from "react";
import "./Home.css";
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
import axios from "axios";
import { API_KEY } from "../constants";

export default function Home() {
  const [data, setData] = useState([]);
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [description, setDescription] = useState([]);
  const [dayweather,setDayweather]=useState([]);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);
  console.log(lat, "lat");
  console.log(long, "long");

  useEffect(() => {
    if(lat && long) {
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
    }
  }, [lat, long]);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

const date = new Date();
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayIndex = date.getDay();
const currentWeekday = weekdays[dayIndex];

useEffect(()=>{
  if(lat&&long){

  axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}cnt=7&appid=${API_KEY}`)
  .then((response)=>{
    console.log(response);
    setDayweather(response)
  })
  .catch((error)=>{
    console.log(error);
  })
}

},[lat,long])
console.log(dayweather);

  return (
    <>
      <div className="container-fluid weather2">
        <div className="heads">
          <h1 className="text">{data.name}</h1>
          <h3 className="degree">
            <FaLongArrowAltDown />
            {((data?.main?.temp_min)-273.15).toFixed(1)}°
            <FaLongArrowAltUp />
            {((data?.main?.temp_max)-273.15).toFixed(1)}°
          </h3>
        </div>

        <div className="rowtwo">
          <p className="psize">
           {currentWeekday}<br />
            {getCurrentDate()} <br />
            Wind {data?.wind?.speed}km/h
            <br />
            <WiHumidity />
            {data?.main?.humidity}%
          </p>
          <h2 className="icontext">
            <TiWeatherPartlySunny className="iconsize" />

            {description.length == 0 ? (
              ""
            ) : (
              <p className="sub">{data?.weather[0]?.description}</p>
            )}
          </h2>

          <h1 className="size">{((data?.main?.temp)-273.15).toFixed(1)} <span className="spancel">°</span> </h1>
        </div>
      </div>

      <div className="rowtwos">
        <h3>
          MON <br />
          <TiWeatherSunny /> <br />
          {/* 25° */}
        </h3>
        <h3>
          TUE
          <br />
          <TiWeatherCloudy /> <br />
          {/* 20° */}
        </h3>

        <h3>
          WED <br />
          <TiWeatherShower /> <br />
          {/* 19° */}
        </h3>

        <h3>
          THU <br />
          <TiWeatherStormy /> <br />
          {/* 15° */}
        </h3>

        <h3>
          FRI <br />
          <TiWeatherSnow /> <br />
          {/* -5° */}
        </h3>

        <h3>
          SAT <br />
          <TiWeatherWindyCloudy /> <br />
          {/* 23° */}
        </h3>

        <h3>
          SUN <br />
          <TiWeatherDownpour /> <br />
          {/* 15° */}
        </h3>
      </div>
      <br />
      <br />
    </>
  );
}
