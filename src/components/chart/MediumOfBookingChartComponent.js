import React, { useState } from "react";
import { connect } from "react-redux";
import { RadialChart, Hint } from "react-vis";
import mediumOfBooking from "../../util/chart/mediumOfBooking";

const _MediumOfBookingChartComponent = props => {
  const [value, setValue] = useState(false);

  const handleHover = value => {
    setValue(value);
  };

  const data = mediumOfBooking(props.rideList);
  return (
    <div>
      <RadialChart
        data={data}
        width={250}
        height={250}
        innerRadius={50}
        radius={100}
        onValueMouseOver={v => handleHover(v)}
        onValueMouseOut={v => handleHover(false)}
      >
        {value !== false && (
          // <div style={{ position: "relative" }}>
          <Hint value={value}>
            <div
              style={{
                background: "black",
                color: "white",
                padding: "10px"
              }}
            >
              <h4>Mode of Booking</h4>
              <p>{value.label}</p>
            </div>
          </Hint>
          // </div>
        )}
      </RadialChart>
    </div>
  );
};

const mapStateToProps = state => ({
  rideList: state.data.rideList
});

const MediumOfBookingChartComponent = connect(mapStateToProps)(
  _MediumOfBookingChartComponent
);

export default MediumOfBookingChartComponent;
