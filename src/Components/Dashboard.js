import React, { Component } from "react";
import { connect } from "react-redux";
import { StaticMap } from "react-map-gl";
import DeckGL from "deck.gl";

import DropzoneComponent from "./DropzoneComponent";
import { renderLayers } from "../util/deckgl-layers";
import {
  MapStylePicker,
  LayerControls,
  HEXAGON_CONTROLS
} from "../util/controls";
import { isNumber } from "util";
import ChartReportComponent from "./ChartReportComponent";

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
    const { hover } = this.state;
    return (
      <div className="dashboard">
        <DropzoneComponent />
        <div className="map-container">
          {hover.hoveredObject && (
            <div
              className="tooltip"
              style={{ transform: `translate(${hover.x}px, ${hover.y}px)` }}
            >
              <div>{hover.label}</div>
            </div>
          )}
          <MapStylePicker
            currentStyle={this.state.style}
            onStyleChange={this.handleStyleChange}
          />
          <LayerControls
            settings={this.state.settings}
            plotTypes={HEXAGON_CONTROLS}
            onChange={settings => this._updateLayerSettings(settings)}
          />
          <DeckGL
            // width={window.innerWidth / 1.5}
            // height={window.innerHeight}
            layers={renderLayers({
              data: this.props.points,
              hour: isNumber(this.state.highlightedHour)
                ? this.state.highlightedHour
                : this.state.selectedHour,
              settings: this.state.settings,
              onHover: hover => this.handleHover(hover)
            })}
            initialViewState={this.props.INITIAL_VIEW_STATE}
            controller
          >
            <StaticMap mapStyle={this.state.style} />
          </DeckGL>
        </div>
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
  isFileUploaded: state.data.isFileUploaded,
  INITIAL_VIEW_STATE: state.map.INITIAL_VIEW_STATE,
  points: state.map.points
});

export default connect(mapStateToProps)(Dashboard);
