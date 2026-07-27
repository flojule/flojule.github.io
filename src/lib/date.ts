export function formatPeriod(startDate: Date, endDate?: Date): string {
  // Frontmatter dates are parsed as UTC midnight; format in UTC so the build
  // machine's timezone cannot shift them into the previous month.
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  };
  const start = startDate.toLocaleDateString("en-US", options);
  const end = endDate
    ? endDate.toLocaleDateString("en-US", options)
    : "Present";
  return `${start} - ${end}`;
}
