import React from "react";
import { connect } from "react-redux";
import { XYPlot, XAxis, YAxis, LineSeries } from "react-vis";

import ridesByMonth from "../../util/chart/ridesByMonth";

const _RidesByMonthChartComponent = props => {
  const { rideList } = props;
  const data = ridesByMonth(rideList);
  console.log(data);

  return (
    <div className="chart">
      <XYPlot xType="ordinal" height={140} width={480}>
        <XAxis
          style={{
            line: { stroke: "#ADDDE1" },
            ticks: { stroke: "#ADDDE1" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
          }}
        />
        <YAxis
          style={{
            line: { stroke: "#ADDDE1" },
            ticks: { stroke: "#ADDDE1" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
          }}
        />
        <LineSeries data={data} style={{ stroke: "violet", strokeWidth: 3 }} />
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
