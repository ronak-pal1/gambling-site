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
