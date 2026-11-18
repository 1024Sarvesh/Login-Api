export function formatDate(isoDate) {
  if (!isoDate) return "";

  const date = new Date(isoDate);

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

