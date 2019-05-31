import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StaticMap } from "react-map-gl";
import DeckGL from "deck.gl";

import { renderLayers } from "../../util/deckgl-layers";
import MapStylePicker from "./MapStylePicker";
import LayerControls from "./LayerControls";
import { HEXAGON_CONTROLS } from "../../util/map/controls";
import processData from "../../util/map/processData";

const initialState = {
  INITIAL_VIEW_STATE: {
    longitude: 77.63817,
    latitude: 13.00198,
    zoom: 11,
    minZoom: 5,
    maxZoom: 16,
    pitch: 0,
    bearing: 0
  },
  style: "mapbox://styles/mapbox/light-v9",
  points: [],
  hover: {
    x: 0,
    y: 0,
    hoveredObject: null
  },
  settings: Object.keys(HEXAGON_CONTROLS).reduce(
    (accu, key) => ({
      ...accu,
      [key]: HEXAGON_CONTROLS[key].value
    }),
    {}
  ),
  showSettings: false
};

const _MapComponent = props => {
  const [mapState, setMapState] = useState(initialState);

  useEffect(() => {
    const points = processData(props.rideList);
    setMapState(prevState => ({ ...prevState, points }));
  }, [props.rideList]);

  const handleHover = ({ x, y, object }) => {
    console.log(object);

    const label = object
      ? object.points
        ? `${object.points.length} ${
            props.highlightedHour || props.selectedHour
              ? "pickups"
              : "pickups or dropoffs"
          }  here`
        : object.pickup
        ? "Pickup"
        : "Dropoff"
      : null;

    const hover = { x, y, hoveredObject: object, label };
    setMapState(prevState => ({ ...prevState, hover }));
  };

  const handleMapStyle = style => {
    setMapState(prevState => ({ ...prevState, style }));
  };

  const handleLayerSettings = settings => {
    setMapState(prevState => ({ ...prevState, settings }));
  };

  const handleSettingsToggle = () => {
    setMapState(prevState => ({
      ...prevState,
      showSettings: !prevState.showSettings
    }));
  };

  return (
    <div className="map-container">
      {mapState.hover.hoveredObject && (
        <div
          className="tooltip"
          style={{
            transform: `translate(${mapState.hover.x}px, ${mapState.hover.y}px)`
          }}
        >
          <div>{mapState.hover.label}</div>
        </div>
      )}
      <MapStylePicker style={mapState.style} changeMapStyle={handleMapStyle} />
      <LayerControls
        showSettings={mapState.showSettings}
        toggleSettings={handleSettingsToggle}
        plotTypes={HEXAGON_CONTROLS}
        settings={mapState.settings}
        handleLayerSettings={handleLayerSettings}
      />
      <DeckGL
        layers={renderLayers({
          data: mapState.points,
          hour:
            typeof props.highlightedHour === "number"
              ? props.highlightedHour
              : props.selectedHour,
          settings: mapState.settings,
          mode: props.highlightedMode,
          onHover: hover => handleHover(hover)
        })}
        initialViewState={mapState.INITIAL_VIEW_STATE}
        controller
      >
        <StaticMap mapStyle={mapState.style} />
      </DeckGL>
    </div>
  );
};

const mapStateToProps = state => ({
  // INITIAL_VIEW_STATE: state.map.INITIAL_VIEW_STATE,
  rideList: state.data.rideList,
  // points: state.map.points,
  // hover: state.map.hover,
  // style: state.map.style,
  // settings: state.map.settings,
  highlightedHour: state.chart.highlightedHour,
  selectedHour: state.chart.selectedHour,
  highlightedMode: state.chart.highlightedMode
});

const MapComponent = connect(mapStateToProps)(_MapComponent);
export default MapComponent;
