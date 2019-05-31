import React from "react";
import { connect } from "react-redux";
import { Grid, Menu, Segment } from "semantic-ui-react";

import PickupTimeChartComponent from "./PickupTimeChartComponent";
import { changeActiveChart } from "../../actions/chartActions";
import MediumOfBookingChartComponent from "./MediumOfBookingChartComponent";
import RidesByMonthChartComponent from "./RidesByMonthChartComponent";

const _ChartReportComponent = props => {
  const { activeChart, changeActiveChart } = props;
  const handleItemClick = (e, { name }) => {
    changeActiveChart(name);
  };

  let chartToShow = "";
  switch (activeChart) {
    case "bio":
      chartToShow = <PickupTimeChartComponent />;
      break;
    case "pics":
      chartToShow = <MediumOfBookingChartComponent />;
      break;
    case "companies":
      chartToShow = <RidesByMonthChartComponent />;
      break;
    default:
      chartToShow = <PickupTimeChartComponent />;
      break;
  }

  return (
    <div className="chart-report">
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="bio"
              active={activeChart === "bio"}
              onClick={handleItemClick}
            >
              <span className="menu-item">
                <i className="fas fa-car" style={{ fontSize: "48px" }} />
                <span>Pickups</span>
              </span>
            </Menu.Item>
            <Menu.Item
              name="pics"
              active={activeChart === "pics"}
              onClick={handleItemClick}
              // className=".menu-item"
            >
              <span className="menu-item">
                <i className="fas fa-desktop" style={{ fontSize: "48px" }} />
                <span>Device</span>
              </span>
            </Menu.Item>
            <Menu.Item
              name="companies"
              active={activeChart === "companies"}
              onClick={handleItemClick}
            >
              <span className="menu-item">
                <i className="fas fa-calendar" style={{ fontSize: "48px" }} />
                <span>Monthly</span>
              </span>
            </Menu.Item>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <div className="chart-container">{chartToShow}</div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  activeChart: state.chart.activeChart
});

const ChartReportComponent = connect(
  mapStateToProps,
  { changeActiveChart }
)(_ChartReportComponent);
export default ChartReportComponent;
