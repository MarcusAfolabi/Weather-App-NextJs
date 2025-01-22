"use client"; 
import { useState } from "react";
import WeatherCard from "./weather/WeatherCard";
import WeatherDetailsCard from "./../app/weather/WeatherDetailsCard";
import { getWeather } from "./api/getWeather";
import { formatDateWithOrdinal } from "./utils/dateHelpers";

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
      setWeatherData(data);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-gray-600 min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="max-w-6xl w-full">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          {/* Search Bar */}
          <div className="flex w-full max-w-md">
            <input
              type="text"
              className="rounded px-1 py-1 text-black"
              placeholder="Search city..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className="btn bg-yellow-400 rounded py-2 px-4 text-black ml-2"
              onClick={fetchWeather}
              disabled={loading}
            >
              {loading ? "Loading..." : "Go"}
            </button>
          </div>

          {/* Unit Switcher */}
          <div className="flex space-x-2">
            <button
              className={`rounded px-4 py-2 ${
                unit === "metric"
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setUnit("metric")}
            >
              °C
            </button>
            <button
              className={`rounded px-4 py-2 ${
                unit === "imperial"
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => setUnit("imperial")}
            >
              °F
            </button>
          </div>
        </div>

        {/* Main Weather Card */}
        {weatherData?.current && (
          <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              {/* Weather Icon */}
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0]?.icon}@2x.png`}
                alt={`Weather icon for ${weatherData.current.weather[0]?.description}`}
                className="w-24 h-24"
              />
              {/* Weather Information */}
              <div className="ml-6">
                <h2 className="text-4xl font-bold">
                  {weatherData.current.main?.temp}°
                  {unit === "metric" ? "C" : "F"}
                </h2>
                <p className="text-xl capitalize">
                  {weatherData.current.weather[0]?.description}
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-lg">
              {formatDateWithOrdinal(weatherData.current.dt * 1000)},{" "}
              {weatherData.current.name}
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
                  day: "numeric",
                  month: "short",
                })}
                temp={day.temp.day}
                tempMax={day.temp.max}
                icon={day.weather[0]?.icon}
              />
            ))}
          </div>
        )}

        {/* Wind and Humidity Information */}
        {weatherData?.current && (
          <div className="grid grid-cols-2 gap-4 mt-8">
            <WeatherDetailsCard
              label="Wind Status"
              value={`${weatherData.current.wind?.speed || 0} ${
                unit === "metric" ? "km/h" : "mph"
              }`}
            />
            <WeatherDetailsCard
              label="Humidity"
              value={`${weatherData.current.main?.humidity || 0}%`}
              bar={true}
              barValue={weatherData.current.main?.humidity || 0}
            />
          </div>
        )}
      </div>
    </div>
  );
}
