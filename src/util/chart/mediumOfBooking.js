const mediumOfBooking = rideList => {
  const medium = rideList.reduce(
    (accu, curr) => {
      if (curr.online_booking) {
        // const prevNumber = accu.mediumOfBooking.online_booking || 0;
        // accu.mediumOfBooking.online_booking = prevNumber + 1;
        accu[0].angle++;
      } else if (curr.mobile_site_booking) {
        // const prevNumber = accu.mediumOfBooking.mobile_site_booking || 0;
        // accu.mediumOfBooking.mobile_site_booking = prevNumber + 1;
        accu[1].angle++;
      } else {
        // const prevNumber = accu.mediumOfBooking.other_mode_booking || 0;
        // accu.mediumOfBooking.other_mode_booking = prevNumber + 1;
        accu[2].angle++;
      }
      return accu;
    },
    [
      {
        label: "Online Booking",
        angle: 0
      },
      {
        label: "Mobile Site Booking",
        angle: 0
      },
      {
        label: "Other Modes",
        angle: 0
      }
    ]
  );
  return medium;
};

export default mediumOfBooking;
