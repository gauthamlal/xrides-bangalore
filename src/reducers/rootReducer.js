import { combineReducers } from "redux";

import fileReducer from "./fileReducer";
import chartReducer from "./chartReducer";

const rootReducer = combineReducers({
  data: fileReducer,
  chart: chartReducer
});

export default rootReducer;
