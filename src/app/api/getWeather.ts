// api/getWeather.ts
export async function getWeather(location: string, unit: string) {
  if (!location) throw new Error("Location is required.");
  if (!unit) throw new Error("Unit is required.");
  console.log(unit);
  
  const API_URL = `https://aroyalefashion.com/api/v1/weather?city=${location}&units=${unit}`;
  // const API_URL = `http://localhost:8000/api/v1/weather?city=${location}&units=${unit}`; for local development

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch weather data.");
    }

    const result = await response.json();

    if (result.status !== "success") {
      throw new Error(result.message || "Error fetching weather data.");
    }

    return result.data;
  } catch (error: any) {
    console.error("Error in getWeather:", error.message);
    throw new Error(error.message);
  }
}
