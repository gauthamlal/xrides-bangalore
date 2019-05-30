import React from "react";
import { connect } from "react-redux";
import { VerticalBarSeries, XAxis, YAxis, XYPlot } from "react-vis";

const _PickupTimeChartComponent = ({
  totalEntries,
  pickups,
  // dropoffs,
  highlight,
  highlightedHour,
  select,
  selectedHour
}) => {
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
  // const totalEntries = rideList.length;
  return (
    <div className="chart">
      <h2>Pickups by hour</h2>
      <p>As percentage of all trips</p>
      <XYPlot
        height={140}
        width={480}
        // margin={{ left: 40, right: 25, top: 10, bottom: 35 }}
        // yDomain={[0, 5]}
        // onMouseLeave={() => highlight(null)}
      >
        <XAxis
          tickFormat={h =>
            h % 24 >= 12 ? (h % 12 || 12) + "PM" : (h % 12 || 12) + "AM"
          }
          tickSizeInner={0}
          tickValues={[0, 6, 12, 18, 24]}
          style={{
            line: { stroke: "#ADDDE1" },
            ticks: { stroke: "#ADDDE1" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
          }}
        />
        <YAxis
          tickFormat={d => {
            // console.log(d);
            // console.log(((d / totalEntries) * 100).toFixed(0) + "%");

            return ((d / totalEntries) * 100).toFixed(0) + "%";
          }}
          style={{
            line: { stroke: "#ADDDE1" },
            ticks: { stroke: "#ADDDE1" },
            text: { stroke: "none", fill: "#6b6b76", fontWeight: 600 }
          }}
        />
        <VerticalBarSeries
          colorType="literal"
          data={data}
          onValueMouseOver={d => highlight(d.hour)}
          onValueMouseOut={() => highlight(null)}
          onValueClick={d => select(d.hour)}
          style={{ cursor: "pointer" }}
        />
        {/* <LineSeries data={dropoffs} color="#f08" /> */}
      </XYPlot>
    </div>
  );
};

const mapStyleToProps = state => ({
  totalEntries: state.data.rideList.length,
  pickups: state.chart.pickups,
  // highlight,
  highlightedHour: state.chart.highlightedHour,
  // select,
  selectedHour: state.chart.selectedHour
});

const PickupTimeChartComponent = connect(mapStyleToProps)(
  _PickupTimeChartComponent
);

export default PickupTimeChartComponent;
