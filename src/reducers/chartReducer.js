import {
  FILE_UPLOAD,
  FILE_REMOVAL,
  CHART_HIGHLIGHT,
  CHART_SELECT,
  CHANGE_ACTIVE_CHART
} from "../actions/types";

const initialState = {
  // pickupObj: {},
  // dropoffObj: {},
  // pickups: [],
  // dropoffs: [],
  selectedHour: null,
  highlightedHour: null,
  activeChart: "bio"
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_UPLOAD:
      return {
        ...state
        // pickupObj: action.payload.pickupObj,
        // dropoffObj: action.payload.dropoffObj,
        // pickups: action.payload.pickups,
        // dropoffs: action.payload.dropoffs
      };
    case FILE_REMOVAL:
      return initialState;
    case CHART_HIGHLIGHT:
      return {
        ...state,
        highlightedHour: action.payload
      };
    case CHART_SELECT:
      return {
        ...state,
        selectedHour: action.payload
      };
    case CHANGE_ACTIVE_CHART:
      return {
        ...state,
        activeChart: action.payload
      };
    default:
      return state;
  }
};

export default chartReducer;
