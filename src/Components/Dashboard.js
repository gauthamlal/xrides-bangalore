import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "deck.gl";
// import BigNumber from "bignumber.js";

// import { MapStylePicker } from "./controls";
import DropzoneComponent from "./DropzoneComponent";
import { renderLayers } from "../util/deckgl-layers";
import {
  MapStylePicker,
  LayerControls,
  HEXAGON_CONTROLS
} from "../util/controls";
import Charts from "../util/charts";
import { isNumber } from "util";

const INITIAL_VIEW_STATE = {
  longitude: 77.63817,
  latitude: 13.00198,
  zoom: 11,
  minZoom: 5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

export default class Dashboard extends Component {
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
    }
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

  _processData = () => {
    const data = this.state.rideList.reduce(
      (accu, curr) => {
        // console.log(curr.from_date);
        // console.log(new Date(curr.from_date));
        const pickupHour = curr.from_date
          ? new Date(curr.from_date).getHours()
          : null;
        const dropoffHour = curr.to_date
          ? new Date(curr.to_date).getHours()
          : null;

        if (curr.from_long) {
          accu.points.push({
            position: [Number(curr.from_long), Number(curr.from_lat)],
            hour: pickupHour,
            pickup: true
          });
        }
        if (curr.to_long) {
          accu.points.push({
            position: [Number(curr.to_long), Number(curr.to_lat)],
            hour: dropoffHour,
            pickup: false
          });
        }
        if (isNumber(pickupHour)) {
          const prevPickups = accu.pickupObj[pickupHour] || 0;
          accu.pickupObj[pickupHour] = prevPickups + 1;
        }
        if (isNumber(dropoffHour)) {
          const prevDropoffs = accu.dropoffObj[dropoffHour] || 0;
          accu.dropoffObj[dropoffHour] = prevDropoffs + 1;
        }
        return accu;
      },
      {
        points: [],
        pickupObj: {},
        dropoffObj: {}
      }
    );

    data.pickups = Object.entries(data.pickupObj).map(([hour, count]) => {
      return { hour: Number(hour), x: Number(hour) + 0.5, y: count };
    });

    data.dropoffs = Object.entries(data.dropoffObj).map(([hour, count]) => {
      return { hour: Number(hour), x: Number(hour) + 0.5, y: count };
    });
    this.setState(data);
  };

  _updateLayerSettings = settings => {
    this.setState({ settings });
  };

  render() {
    console.log(this.state);
    const { hover } = this.state;
    return (
      <div className="dashboard">
        <DropzoneComponent handleDrop={this.handleDrop} />
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
            width={window.innerWidth / 1.5}
            height={window.innerHeight}
            layers={renderLayers({
              data: this.state.points,
              settings: this.state.settings,
              onHover: hover => this.handleHover(hover)
            })}
            initialViewState={INITIAL_VIEW_STATE}
            controller
          >
            <StaticMap mapStyle={this.state.style} />
          </DeckGL>
          <Charts
            {...this.state}
            highlight={hour => this.handleHighlight(hour)}
            select={hour => this.handleChartSelect(hour)}
          />
        </div>
      </div>
    );
  }
}
