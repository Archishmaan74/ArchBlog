export const formatDateTime = (date, time) => {
  const dateTime = new Date(`${date}T${time}`);

  const dateStr = dateTime.toLocaleDateString("en-IN");
  const timeStr = dateTime
    .toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();

  return { dateStr, timeStr };
};
