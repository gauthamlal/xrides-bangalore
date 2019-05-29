import { combineReducers } from "redux";

import fileReducer from "./fileReducer";
import mapReducer from "./mapReducer";

const rootReducer = combineReducers({
  data: fileReducer,
  map: mapReducer
});

export default rootReducer;
