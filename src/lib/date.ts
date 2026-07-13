export function formatPeriod(startDate: Date, endDate?: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
  };
  const start = startDate.toLocaleDateString("en-US", options);
  const end = endDate
    ? endDate.toLocaleDateString("en-US", options)
    : "Present";
  return `${start} - ${end}`;
}
