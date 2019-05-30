import React, { Component } from "react";
import { connect } from "react-redux";

import DropzoneComponent from "../file/DropzoneComponent";
import ChartReportComponent from "../chart/ChartReportComponent";
import MapComponent from "../map/MapComponent";
import { HEXAGON_CONTROLS } from "../../util/map/controls";

const initialState = {
  points: [],
  rideList: [],
  style: "mapbox://styles/mapbox/light-v9",
  settings: Object.keys(HEXAGON_CONTROLS).reduce(
    (accu, key) => ({
      ...accu,
      [key]: HEXAGON_CONTROLS[key].value
    }),
    {}
  ),
  hover: {
    x: 0,
    y: 0,
    hoveredObject: null
  },
  selectedHour: null
};

class Dashboard extends Component {
  state = {
    points: [],
    rideList: [],
    style: "mapbox://styles/mapbox/light-v9",
    settings: Object.keys(HEXAGON_CONTROLS).reduce(
      (accu, key) => ({
        ...accu,
        [key]: HEXAGON_CONTROLS[key].value
      }),
      {}
    ),
    hover: {
      x: 0,
      y: 0,
      hoveredObject: null
    },
    selectedHour: null
  };

  handleFileRemoval = () => {
    this.setState(initialState);
  };

  handleStyleChange = style => {
    this.setState({ style });
  };

  handleHover = ({ x, y, object }) => {
    // console.log(object);

    const label = object
      ? object.points
        ? `${object.points.length} pickups or dropoffs here`
        : object.pickup
        ? "Pickup"
        : "Dropoff"
      : null;

    this.setState({ hover: { x, y, hoveredObject: object, label } });
  };

  handleHighlight = highlightedHour => {
    this.setState({ highlightedHour });
  };

  handleDrop = rideList => {
    this.setState({ rideList });
    this._processData();
  };

  handleChartSelect = selectedHour => {
    this.setState({
      selectedHour:
        selectedHour === this.state.selectedHour ? null : selectedHour
    });
  };

  _updateLayerSettings = settings => {
    this.setState({ settings });
  };

  render() {
    console.log(this.state);
    // const { hover } = this.state;
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
