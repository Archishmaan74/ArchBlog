export const formatDateTime = (date, time) => {
  const dateTime = new Date(`${date}T${time}`);
  const dateStr = dateTime.toLocaleDateString("en-IN");

  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
  const timeStr = `${formattedHour}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;

  return { dateStr, timeStr };
};
