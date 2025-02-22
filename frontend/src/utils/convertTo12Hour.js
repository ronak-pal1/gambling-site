export const convertTo12Hour = (time24) => {
  const [hours, minutes] = time24.split(":");
  let period = "AM";
  let hours12 = parseInt(hours, 10);

  if (hours12 >= 12) {
    period = "PM";
    if (hours12 > 12) {
      hours12 -= 12;
    }
  } else if (hours12 === 0) {
    hours12 = 12;
  }

  const formattedTime = `${hours12}:${minutes} ${period}`;
  return formattedTime;
};

export const addMinutesToCurrentTime = (duration) => {
  // Extract the numeric value from the string (e.g., "2m" -> 2)
  const minutes = parseInt(duration);

  // Get the current time
  const currentTime = new Date();

  // Add minutes
  currentTime.setMinutes(currentTime.getMinutes() + minutes);

  return currentTime;
};
