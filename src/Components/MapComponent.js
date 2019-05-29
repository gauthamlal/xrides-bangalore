import React from "react";
import { connect } from "react-redux";
import { StaticMap } from "react-map-gl";
import DeckGL from "deck.gl";

import { renderLayers } from "../util/deckgl-layers";
import {
  MapStylePicker,
  LayerControls,
  HEXAGON_CONTROLS
} from "../util/controls";

const _MapComponent = props => {
  return (
    <div className="map-container">
      {props.hover.hoveredObject && (
        <div
          className="tooltip"
          style={{
            transform: `translate(${props.hover.x}px, ${props.hover.y}px)`
          }}
        >
          <div>{props.hover.label}</div>
        </div>
      )}
      <MapStylePicker
        currentStyle={props.style}
        // onStyleChange={this.handleStyleChange}
      />
      <LayerControls
        settings={props.settings}
        plotTypes={HEXAGON_CONTROLS}
        // onChange={settings => this._updateLayerSettings(settings)}
      />
      <DeckGL
        // width={window.innerWidth / 1.5}
        // height={window.innerHeight}
        layers={renderLayers({
          data: props.points,
          // hour: !isNaN(Number(this.state.highlightedHour))
          //   ? this.state.highlightedHour
          //   : this.state.selectedHour,
          settings: props.settings
          // onHover: hover => this.handleHover(hover)
        })}
        initialViewState={props.INITIAL_VIEW_STATE}
        controller
      >
        <StaticMap mapStyle={props.style} />
      </DeckGL>
    </div>
  );
};

const mapStateToProps = state => ({
  INITIAL_VIEW_STATE: state.map.INITIAL_VIEW_STATE,
  points: state.map.points,
  hover: state.map.hover,
  style: state.map.style,
  settings: state.map.settings
});

const MapComponent = connect(mapStateToProps)(_MapComponent);
export default MapComponent;
