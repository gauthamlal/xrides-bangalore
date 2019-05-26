import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "deck.gl";
// import BigNumber from "bignumber.js";

// import { MapStylePicker } from "./controls";
import DropzoneComponent from "./DropzoneComponent";

const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.7,
  zoom: 11,
  minZoom: 5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0,
  width: "400px",
  height: "400px"
};

export default class Dashboard extends Component {
  state = {
    rideList: [],
    style: "mapbox://styles/mapbox/light-v9"
  };

  handleDrop = rideList => {
    this.setState({ rideList });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <DropzoneComponent handleDrop={this.handleDrop} />
        <div>
          <DeckGL
            width="500px"
            height="500px"
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
