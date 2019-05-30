import {
  FILE_UPLOAD,
  FILE_REMOVAL,
  CHART_HIGHLIGHT,
  CHART_SELECT
} from "../actions/types";

const initialState = {
  pickupObj: {},
  dropoffObj: {},
  pickups: [],
  dropoffs: [],
  selectedHour: null,
  highlightedHour: null
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_UPLOAD:
      console.log(action.payload);
      return {
        ...state,
        pickupObj: action.payload.pickupObj,
        dropoffObj: action.payload.dropoffObj,
        pickups: action.payload.pickups,
        dropoffs: action.payload.dropoffs
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
    default:
      return state;
  }
};

export default chartReducer;
