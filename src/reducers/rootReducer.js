import { combineReducers } from "redux";

import fileReducer from "./fileReducer";
import mapReducer from "./mapReducer";
import chartReducer from "./chartReducer";

const rootReducer = combineReducers({
  data: fileReducer,
  map: mapReducer,
  chart: chartReducer
});

export default rootReducer;
