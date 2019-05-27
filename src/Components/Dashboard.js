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
  SCATTERPLOT_CONTROLS
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
    settings: Object.keys(SCATTERPLOT_CONTROLS).reduce(
      (accu, key) => ({
        ...accu,
        [key]: SCATTERPLOT_CONTROLS[key].value
      }),
      {}
    )
  };

  handleStyleChange = style => {
    this.setState({ style });
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
      accu.push({
        position: [
          curr.to_long ? Number(curr.to_long) : null,
          curr.to_lat ? Number(curr.to_lat) : null
        ],
        pickup: false
      });
      return accu;
    }, []);
    this.setState({ points });
  };

  _updateLayerSettings = settings => {
    this.setState({ settings });
  };

  render() {
    console.log(this.state);
    return (
      <div className="dashboard">
        <DropzoneComponent handleDrop={this.handleDrop} />

        <div className="map-container">
          <MapStylePicker
            currentStyle={this.state.style}
            onStyleChange={this.handleStyleChange}
          />
          <LayerControls
            settings={this.state.settings}
            plotTypes={SCATTERPLOT_CONTROLS}
            onChange={settings => this._updateLayerSettings(settings)}
          />
          <DeckGL
            width={window.innerWidth / 1.5}
            height={window.innerHeight}
            layers={renderLayers({
              data: this.state.points,
              settings: this.state.settings
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
