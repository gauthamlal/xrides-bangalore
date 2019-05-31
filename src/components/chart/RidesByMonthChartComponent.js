import React, { useState } from "react";
import { connect } from "react-redux";
import {
  XYPlot,
  XAxis,
  YAxis,
  LineSeries,
  HorizontalGridLines,
  VerticalGridLines,
  Hint
} from "react-vis";

import ridesByMonth from "../../util/chart/ridesByMonth";

const _RidesByMonthChartComponent = props => {
  const [value, setValue] = useState(false);
  const { rideList } = props;
  const data = ridesByMonth(rideList);

  return (
    <div className="chart" onMouseOut={() => setValue(false)}>
      <h2 style={{ marginTop: "10px" }}>Trips per month</h2>
      {/* <p>As percentage of all trips</p> */}
      <XYPlot
        xType="ordinal"
        height={140}
        width={500}
        margin={{ left: 45, right: 25, top: 30, bottom: 25 }}
        animation={false}
      >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis tickSizeInner={0} />
        <YAxis />
        <LineSeries
          data={data}
          style={{ stroke: "violet", strokeWidth: 3 }}
          onNearestX={v => {
            if (v.x !== value.x) {
              setValue(v);
            }
          }}
          onSeriesMouseOut={v => {
            setValue(false);
          }}
        />
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
              <h4>Number of Booking</h4>
              <p>{value.x}</p>
              <p>{value.y}</p>
            </div>
          </Hint>
          // </div>
        )}
      </XYPlot>
    </div>
  );
};

const mapStateToProps = state => ({
  rideList: state.data.rideList
});

const RidesByMonthChartComponent = connect(mapStateToProps)(
  _RidesByMonthChartComponent
);

export default RidesByMonthChartComponent;
