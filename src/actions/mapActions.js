import { CHANGE_MAP_STYLE, UPDATE_LAYER_SETTINGS, MAP_HOVER } from "./types";

export const changeMapStyle = style => dispatch => {
  dispatch({
    type: CHANGE_MAP_STYLE,
    payload: style
  });
};

export const updateLayerSettings = settings => dispatch => {
  dispatch({
    type: UPDATE_LAYER_SETTINGS,
    payload: settings
  });
};

export const mapHover = ({ x, y, object }) => dispatch => {
  const label = object
    ? object.points
      ? `${object.points.length} pickups or dropoffs here`
      : object.pickup
      ? "Pickup"
      : "Dropoff"
    : null;

  dispatch({
    type: MAP_HOVER,
    payload: { hover: { x, y, hoveredObject: object, label } }
  });
};
