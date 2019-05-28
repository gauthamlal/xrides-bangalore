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

export default function Charts({
  pickups,
  dropoffs,
  highlight,
  highlightedHour,
  select,
  selectedHour
}) {
  if (!pickups) {
    return <div className="chart" />;
  }

  const data = pickups.map(d => ({
    ...d,
    color:
      d.hour === selectedHour
        ? "#19CDD7"
        : d.hour === highlightedHour
        ? "#17B8BE"
        : "#125C77"
  }));
  return (
    <div className="chart">
      <h2>Pickups by hour</h2>
      <p>As percentage of all trips</p>
      <XYPlot
        height={140}
        width={490}
        margin={{ left: 40, right: 25, top: 10, bottom: 25 }}
        onMouseLeave={() => highlight(null)}
      >
        <XAxis
          tickFormat={h =>
            h % 24 >= 12 ? (h % 12 || 12) + "PM" : (h % 12 || 12) + "AM"
          }
          tickSizeInner={0}
          tickValues={[0, 6, 12, 18, 24]}
        />
        <YAxis tickFormat={d => ((d / 4000) * 100).toFixed(0) + "%"} />
        <VerticalBarSeries
          colorType="literal"
          data={data}
          onValueMouseOver={d => highlight(d.hour)}
          onValueClick={d => select(d.hour)}
          style={{ cursor: "pointer" }}
        />
        {/* <LineSeries data={dropoffs} color="#f08" /> */}
      </XYPlot>
    </div>
  );
}
