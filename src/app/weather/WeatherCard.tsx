interface WeatherCardProps {
  unit: string; // Weather icon
  day: string;
  temp: number; // Dynamic temperature
  tempMax: number; // Dynamic temperature
  icon: string; // Weather icon
}

export default function WeatherCard({unit, day, temp, tempMax, icon }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 text-center">
      <p className="text-gray-600">{day}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
        className="w-16 h-16 mx-auto"
      />
      <p className="text-1xl font-bold">{temp}-{tempMax} °{unit}</p>
    </div>
  );
}
