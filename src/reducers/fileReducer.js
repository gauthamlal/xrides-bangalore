import { FILE_UPLOAD, FILE_REMOVAL } from "../actions/types";

const initialState = {
  rideList: [],
  isFileUploaded: false,
  fileError: null
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_UPLOAD:
      return {
        ...state,
        rideList: action.payload.rideList,
        isFileUploaded: action.payload.isFileUploaded,
        fileError: action.payload.fileError
      };
    case FILE_REMOVAL:
      return {
        ...state,
        rideList: [],
        isFileUploaded: false
      };
    default:
      return state;
  }
};

export default fileReducer;
