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

  handleDrop = rideList => {
    this.setState({ rideList });
    this._processData();
  };

  _processData = () => {
    const points = this.state.rideList.reduce((accu, curr) => {
      accu.push({
        position: [Number(curr.from_long), Number(curr.from_lat)],
        pickup: true
      });
      if (curr.to_long) {
        accu.push({
          position: [Number(curr.to_long), Number(curr.to_lat)],
          pickup: false
        });
      }
      return accu;
    }, []);
    this.setState({ points });
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
        </div>
      </div>
    );
  }
}
