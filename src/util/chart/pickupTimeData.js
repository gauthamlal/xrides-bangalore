const pickupTimeData = rideList => {
  const data = rideList.reduce(
    (accu, curr) => {
      const pickupHour = curr.from_date
        ? new Date(curr.from_date).getHours()
        : null;
      const dropoffHour = curr.to_date
        ? new Date(curr.to_date).getHours()
        : null;

      if (typeof pickupHour === "number") {
        const prevPickups = accu.pickupObj[pickupHour] || 0;
        accu.pickupObj[pickupHour] = prevPickups + 1;
      }
      if (typeof dropoffHour === "number") {
        const prevDropoffs = accu.dropoffObj[dropoffHour] || 0;
        accu.dropoffObj[dropoffHour] = prevDropoffs + 1;
      }

      return accu;
    },
    {
      pickupObj: {},
      dropoffObj: {}
    }
  );

  data.pickups = Object.entries(data.pickupObj).map(([hour, count]) => {
    return { hour: Number(hour), x: Number(hour) + 0.5, y: count };
  });

  data.dropoffs = Object.entries(data.dropoffObj).map(([hour, count]) => {
    return { hour: Number(hour), x: Number(hour) + 0.5, y: count };
  });

  return data;
};

export default pickupTimeData;
