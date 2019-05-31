const processData = rideList => {
  const points = rideList.reduce((accu, curr) => {
    const pickupHour = curr.from_date
      ? new Date(curr.from_date).getHours()
      : null;
    const dropoffHour = curr.to_date ? new Date(curr.to_date).getHours() : null;

    const mode = curr.online_booking
      ? "online_booking"
      : curr.mobile_site_booking
      ? "mobile_site_booking"
      : "others";

    if (curr.from_long) {
      accu.push({
        position: [Number(curr.from_long), Number(curr.from_lat)],
        hour: pickupHour,
        pickup: true,
        mode
      });
    }
    if (curr.to_long) {
      accu.push({
        position: [Number(curr.to_long), Number(curr.to_lat)],
        hour: dropoffHour,
        pickup: false,
        mode
      });
    }

    return accu;
  }, []);

  return points;
};

export default processData;
