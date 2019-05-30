import {
  FILE_UPLOAD,
  FILE_REMOVAL,
  UPDATE_LAYER_SETTINGS,
  MAP_HOVER
} from "../actions/types";
import { HEXAGON_CONTROLS } from "../util/map/controls";

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
  )
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_UPLOAD:
      return {
        ...state,
        points: action.payload.points
      };
    case FILE_REMOVAL:
      return {
        ...state,
        points: []
      };
    case UPDATE_LAYER_SETTINGS:
      return {
        ...state,
        settings: action.payload
      };
    case MAP_HOVER:
      return {
        ...state,
        hover: action.payload.hover
      };
    default:
      return state;
  }
};

export default mapReducer;
