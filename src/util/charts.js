import React from "react";
import {
  VerticalBarSeries,
  XAxis,
  YAxis,
  XYPlot
  // ,
  // MarkSeries,
  // LineSeries
} from "react-vis";

export default function Charts({ pickups, dropoffs }) {
  if (!pickups) {
    return <div className="chart" />;
  }
  return (
    <div className="chart">
      <h2>Pickups by hour</h2>
      <p>As percentage of all trips</p>
      <XYPlot
        height={140}
        width={490}
        margin={{ left: 40, right: 25, top: 10, bottom: 25 }}
      >
        <XAxis
          tickFormat={h =>
            h % 24 >= 12 ? (h % 12 || 12) + "PM" : (h % 12 || 12) + "AM"
          }
          tickSizeInner={0}
          tickValues={[0, 6, 12, 18, 24]}
        />
        <YAxis tickFormat={d => ((d / 4000) * 100).toFixed(0) + "%"} />
        <VerticalBarSeries color="#125C77" data={pickups} />
        {/* <LineSeries data={dropoffs} color="#f08" /> */}
      </XYPlot>
    </div>
  );
}
