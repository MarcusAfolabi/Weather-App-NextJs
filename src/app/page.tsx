"use client";

import { useState } from "react";
import WeatherCard from "./weather/WeatherCard";
import WeatherDetailsCard from "./../app/weather/WeatherDetailsCard";
import { getWeather } from "./api/getWeather";

export default function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!location) return;
    setLoading(true);

    try {
      const data = await getWeather(location, unit);
      console.log(data);

      setWeatherData(data);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          {/* Search Bar */}
          <div className="flex w-full max-w-md">
            <input
              type="text"
              className="input rounded px-1 text-dark py-2"
              placeholder="Search city..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className="btn bg-yellow-400 rounded py-2 px-2 text-black ml-2"
              onClick={fetchWeather}
              disabled={loading}
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>

          {/* Unit Switcher */}
          <div className="flex justify-content-between">
            <button
              className={`rounded btn btn-rounded ${
                unit === "metric" ? "btn bg-red-500" : "btn bg-gray-500"
              }`}
              onClick={() => setUnit("metric")}
            >
              °C
            </button>
            <button
              className={`rounded btn btn-rounded ${
                unit === "imperial" ? "btn bg-red-500" : "btn bg-gray-500"
              } ml-2`}
              onClick={() => setUnit("imperial")}
            >
              °F
            </button>
          </div>
        </div>

        {/* Main Weather Card */}
        {weatherData && (
          <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              {/* Weather Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                ></path>
              </svg>

              {/* Weather Information */}
              <div className="ml-6">
                <h2 className="text-4xl font-bold">{weatherData.main.temp}°</h2>
                <p className="text-xl capitalize">
                  {weatherData.weather[0].description}
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-lg">
              {new Date(weatherData.dt * 1000).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              , {weatherData.name}, {weatherData.sys.country}
            </p>
          </div>
        )}

        {/* Next Days Forecast */}
        {weatherData?.forecast && (
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {weatherData.forecast.slice(0, 3).map((day: any, idx: number) => (
                    <WeatherCard
                      key={idx}
                      unit={unit === "metric" ? "C" : "F"}
                      day={new Date(day.dt * 1000).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                      temp={day.temp.day}
                      icon={day.weather[0]?.icon}
                    />
                  ))}
                </div>
              )}
      
      

        {/* Wind and Humidity Information */}
        {weatherData && (
          <div className="grid grid-cols-2 gap-4 mt-8">
            <WeatherDetailsCard
              label="Wind Status"
              value={`${weatherData.wind.speed} ${
                unit === "metric" ? "km/h" : "mph"
              }`}
            />
            <WeatherDetailsCard
              label="Humidity"
              value={`${weatherData.main.humidity}%`}
              bar={true}
              barValue={weatherData.main.humidity}
            />
          </div>
        )}
      </div>
    </div>
  );
}
