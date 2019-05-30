const processData = rideList => {
  const data = rideList.reduce(
    (accu, curr) => {
      const pickupHour = curr.from_date
        ? new Date(curr.from_date).getHours()
        : null;
      const dropoffHour = curr.to_date
        ? new Date(curr.to_date).getHours()
        : null;

      const mode = curr.online_booking
        ? "online_booking"
        : curr.mobile_site_booking
        ? "mobile_site_booking"
        : "others";

      if (curr.from_long) {
        accu.points.push({
          position: [Number(curr.from_long), Number(curr.from_lat)],
          hour: pickupHour,
          pickup: true,
          mode
        });
      }
      if (curr.to_long) {
        accu.points.push({
          position: [Number(curr.to_long), Number(curr.to_lat)],
          hour: dropoffHour,
          pickup: false,
          mode
        });
      }
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
      points: [],
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

  // data.mediumOfBooking = rideList.reduce()

  return data;
};

export default processData;
