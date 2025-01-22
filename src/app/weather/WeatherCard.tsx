export default function WeatherCard({ day }: { day: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 text-center">
      <p className="text-gray-600">{day}</p>
      <img
        src={`https://openweathermap.org/img/wn/01d@2x.png`}
        alt="weather icon"
        className="w-16 h-16 mx-auto"
      />
      <p className="text-2xl font-bold">25°C</p>
    </div>
  );
}
