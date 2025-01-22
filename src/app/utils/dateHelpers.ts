// src/utils/dateHelpers.ts
export function formatDateWithOrdinal(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const ordinal = getOrdinalSuffix(day);
  return `${day}${ordinal} ${month} ${year}`;
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th"; // Covers 4th - 20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
