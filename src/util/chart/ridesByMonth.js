const ridesByMonth = rideList => {
  const data = rideList.reduce(
    (accu, curr) => {
      // console.log(new Date(curr.from_date));

      const rideMonth = curr.from_date
        ? new Date(curr.from_date).getMonth()
        : null;
      if (typeof rideMonth === "number") {
        const prevRides = accu.monthObj[rideMonth] || 0;
        accu.monthObj[rideMonth] = prevRides + 1;
      }
      return accu;
    },
    {
      monthObj: {}
    }
  );
  data.monthArr = Object.entries(data.monthObj).map(([month, count]) => ({
    x: month,
    y: count
  }));
  return data.monthArr;
};

export default ridesByMonth;
