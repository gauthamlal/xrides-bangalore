import { FILE_UPLOAD, FILE_REMOVAL } from "./types";
import handleFileUpload from "../util/file/handleFileUpload";
import processData from "../util/map/processData";

export const uploadFile = file => dispatch => {
  handleFileUpload(file)
    .then(res => {
      const data = processData(res.rideList);
      const payload = { ...data };
      payload.rideList = res.rideList;
      payload.isFileUploaded = true;
      dispatch({
        type: FILE_UPLOAD,
        payload
      });
    })
    .catch(err => {
      const payload = {};
      payload.rideList = [];
      payload.isFileUploaded = false;
      dispatch({
        type: FILE_UPLOAD,
        payload
      });
    });
};

export const removeFile = () => dispatch => {
  dispatch({
    type: FILE_REMOVAL
  });
};
