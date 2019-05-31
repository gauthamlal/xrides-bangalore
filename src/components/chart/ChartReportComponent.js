import React, { useState } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";

import PickupTimeChartComponent from "./PickupTimeChartComponent";
import MediumOfBookingChartComponent from "./MediumOfBookingChartComponent";
import RidesByMonthChartComponent from "./RidesByMonthChartComponent";

const ChartReportComponent = () => {
  // const { activeChart, changeActiveChart } = props;
  const [activeChart, setActiveChart] = useState("pickup");
  const handleItemClick = (e, { name }) => {
    setActiveChart(name);
  };

  let chartToShow = "";
  switch (activeChart) {
    case "pickup":
      chartToShow = <PickupTimeChartComponent />;
      break;
    case "medium":
      chartToShow = <MediumOfBookingChartComponent />;
      break;
    case "monthly":
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
              name="pickup"
              active={activeChart === "pickup"}
              onClick={handleItemClick}
            >
              <span className="menu-item">
                <i className="fas fa-car" style={{ fontSize: "48px" }} />
                <span>Pickups</span>
              </span>
            </Menu.Item>
            <Menu.Item
              name="medium"
              active={activeChart === "medium"}
              onClick={handleItemClick}
              // className=".menu-item"
            >
              <span className="menu-item">
                <i className="fas fa-desktop" style={{ fontSize: "48px" }} />
                <span>Device</span>
              </span>
            </Menu.Item>
            <Menu.Item
              name="monthly"
              active={activeChart === "monthly"}
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

export default ChartReportComponent;
