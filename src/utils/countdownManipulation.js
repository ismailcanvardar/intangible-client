import moment from "moment";

export const manipulateCountdown = (type, auctionData, setCountdownData) => {
  if (type === "SCHEDULED") {
    const interval = setInterval(() => {
      const endingDate = moment(auctionData.endingDate);
      const countdown = moment(moment(endingDate) - moment());
      const days = countdown.format("D");
      const hours = countdown.format("HH");
      const minutes = countdown.format("mm");
      const seconds = countdown.format("ss");

      setCountdownData({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);

    return () => clearInterval(interval);
  }
};

export const formatCountdown = (data) => {
  let formatted;

  if (data.seconds !== "0") {
    formatted = `${data.seconds}s`;
  }

  if (data.minutes !== "0") {
    formatted = `${data.minutes}m ${formatted}`;
  }

  if (data.hours !== "0") {
    formatted = `${data.hours}h ${formatted}`;
  }

  if (data.days !== "0") {
    formatted = `${data.days}d ${formatted}`;
  }

  return formatted;
};
