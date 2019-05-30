import { FILE_UPLOAD, FILE_REMOVAL } from "../actions/types";

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
    default:
      return state;
  }
};

export default chartReducer;
