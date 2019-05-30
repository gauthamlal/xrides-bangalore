import React, { Component } from "react";
import { connect } from "react-redux";

import DropzoneComponent from "../file/DropzoneComponent";
import ChartReportComponent from "../chart/ChartReportComponent";
import MapComponent from "../map/MapComponent";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <DropzoneComponent />
        <MapComponent />
        {this.props.isFileUploaded ? (
          <ChartReportComponent
            {...this.state}
            highlight={hour => this.handleHighlight(hour)}
            select={hour => this.handleChartSelect(hour)}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rideList: state.data.rideList,
  isFileUploaded: state.data.isFileUploaded
});

export default connect(mapStateToProps)(Dashboard);
