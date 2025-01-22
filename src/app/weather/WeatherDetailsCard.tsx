interface WeatherDetailsProps {
  label: string;
  value: string;
  bar?: boolean;
  barValue?: number;
}

export default function WeatherDetailsCard({
  label,
  value,
  bar,
  barValue,
}: WeatherDetailsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
      <p className="text-lg font-medium text-gray-600">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {bar && barValue !== undefined && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${barValue}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
