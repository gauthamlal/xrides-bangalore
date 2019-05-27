import React, { Component } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "deck.gl";
// import BigNumber from "bignumber.js";

// import { MapStylePicker } from "./controls";
import DropzoneComponent from "./DropzoneComponent";
import { renderLayers } from "../util/deckgl-layers";

const INITIAL_VIEW_STATE = {
  longitude: 77.63817,
  latitude: 13.00198,
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
    points: [],
    rideList: [],
    style: "mapbox://styles/mapbox/light-v9"
  };

  // componentDidUpdate() {
  //   this._processData();
  // }

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

  render() {
    console.log(this.state);
    return (
      <div>
        <DropzoneComponent handleDrop={this.handleDrop} />
        <div>
          <DeckGL
            width="500px"
            height="500px"
            layers={renderLayers({ data: this.state.points })}
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
