import {
  FILE_REMOVAL,
  CHART_HIGHLIGHT,
  CHART_SELECT,
  MODE_HIGHLIGHT
} from "../actions/types";

const initialState = {
  selectedHour: null,
  highlightedHour: null,
  highlightedMode: null
};

const chartReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case MODE_HIGHLIGHT:
      return {
        ...state,
        highlightedMode: action.payload
      };
    default:
      return state;
  }
};

export default chartReducer;
