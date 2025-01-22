import React from "react";

interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string }[];
}

export default function ForecastList({ data }: { data: ForecastItem[] }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">5-Day Forecast</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index} className="flex justify-between mb-2">
            <span>{new Date(item.dt_txt).toLocaleDateString()}</span>
            <span>{item.main.temp}°C</span>
            <span className="capitalize">{item.weather[0].description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
