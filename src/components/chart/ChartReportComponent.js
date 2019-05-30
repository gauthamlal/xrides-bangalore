import React from "react";
import { connect } from "react-redux";
import { Grid, Menu, Segment } from "semantic-ui-react";

import PickupTimeChartComponent from "./PickupTimeChartComponent";
import { changeActiveChart } from "../../actions/chartActions";

const _ChartReportComponent = props => {
  const { activeChart, changeActiveChart } = props;
  const handleItemClick = (e, { name }) => {
    changeActiveChart(name);
  };

  return (
    <div className="chart-report">
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            <Menu.Item
              name="bio"
              active={activeChart === "bio"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="pics"
              active={activeChart === "pics"}
              onClick={handleItemClick}
              className=".menu-item"
            />
            <Menu.Item
              name="companies"
              active={activeChart === "companies"}
              onClick={handleItemClick}
            />
            <Menu.Item
              name="links"
              active={activeChart === "links"}
              onClick={handleItemClick}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <div className="chart-container">
              <PickupTimeChartComponent />
            </div>
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
